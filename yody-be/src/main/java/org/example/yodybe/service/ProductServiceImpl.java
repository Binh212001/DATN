package org.example.yodybe.service;

import jakarta.transaction.Transactional;
import org.example.yodybe.dto.ProductDto;
import org.example.yodybe.dto.ProductTopDTO;
import org.example.yodybe.entity.*;
import org.example.yodybe.form.FilterForm;
import org.example.yodybe.repositoties.*;
import org.example.yodybe.utils.BaseResponse;
import org.example.yodybe.utils.FileHandler;
import org.example.yodybe.utils.PaginationResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class ProductServiceImpl implements ProductService {
    @Autowired
    ProductRepository productRepository;
    @Autowired
    ColorRepository colorRepository;
    @Autowired
    SizeRepository sizeRepository;
    @Autowired
    ImageRepository imageRepository;
    @Autowired
    private CategoryRepository categoryRepository;
    @Autowired
    ProductColorRepository productColorRepository;
    @Autowired
    ProductSizeRepository productSizeRepository;
    @Autowired
    FileHandler fileHandler;
    @Autowired
    ProductImageRepository productImageRepository;


    public List<Product> getProductsOnSale() {
        return productRepository.findBySalePercentageGreaterThan(0);
    }
    @Transactional
    @Override
    public BaseResponse save(String name, String description, Double price, Long categoryId, List<Long> colorIds, List<Long> sizeIds, List<MultipartFile> images, Integer quantity, Boolean gender, Integer salePercentage) {
        try {
            Product entity = new Product();
            entity.setName(name);
            entity.setDescription(description);
            entity.setPrice(price);
            entity.setGender(gender);
            entity.setQuantity(quantity);
            entity.setSalePercentage(salePercentage);
            Optional<Category> category = categoryRepository.findById(categoryId);
            if (category.isEmpty()) {
                return new BaseResponse("Category is not found", null, 400);
            }
            entity.setCategories(category.get());

            List<Color> colors = colorRepository.findAllById(colorIds);
            if (colors.isEmpty()) {
                return new BaseResponse("Color(s) not found", null, 400);
            }
            List<Size> sizes = sizeRepository.findAllById(sizeIds);
            if (sizes.isEmpty()) {
                return new BaseResponse("Size(s) not found", null, 400);
            }
            Product savedProduct = productRepository.save(entity);
            for (Color color : colors) {
                ProductColor productColor = new ProductColor();
                productColor.setProduct(savedProduct);
                productColor.setColor(color);
                productColorRepository.save(productColor);
            }
            for (Size size : sizes) {
                ProductSize productSize = new ProductSize();
                productSize.setProduct(savedProduct);
                productSize.setSize(size);
                productSizeRepository.save(productSize);
            }
            List<String> fileNames = fileHandler.saveUploadedFile(images);
            for (String fileName : fileNames) {
                Image image = new Image();
                image.setImageUrl(fileName);
                Image image1 = imageRepository.save(image);
                ProductImage productImage = new ProductImage();
                productImage.setProduct(savedProduct);
                productImage.setImage(image1);
                productImageRepository.save(productImage);
            }
            return new BaseResponse("Product saved successfully", savedProduct, 200);
        } catch (Exception e) {
            return new BaseResponse("Error saving product", null, 500);
        }
    }

    @Override
    public BaseResponse getProductList() {
        try {
            List<Product> res = productRepository.findAll();
            return new BaseResponse("Product list", res, 200);
        } catch (Exception e) {
            return new BaseResponse("Error saving product list",null, 500);
        }
    }


    @Override
    public ProductDto mapToProductDto(Product product) {
        return ProductDto.builder()
                .id(product.getId())
                .name(product.getName())
                .description(product.getDescription())
                .price(product.getPrice())
                .status(product.getStatus())
                .quantity(product.getQuantity())
                .categories(product.getCategories())
                .images(product.getImages())
                .colors(product.getColors())
                .sizes(product.getSizes())
                .build();
    }

    @Override
    public BaseResponse getProductById(Long id) {
        try {
            Optional<Product> product = productRepository.findById(id);
            if (product.isEmpty()) {
                return new BaseResponse("Product not found", null, 404);
            }
            ProductDto productDto = mapToProductDto(product.get());
            return new BaseResponse("Product fetched successfully", productDto, 200);
        } catch (Exception e) {
            return new BaseResponse("Error getting product by id", null, 500);
        }
    }

    private PaginationResponse paginationResponseHandler(Page<Product> productPage) {
        List<ProductDto> dto = productPage.getContent().stream().map(this::mapToProductDto).toList();
        int currentPage = productPage.getPageable().getPageNumber();
        int totalPages = productPage.getTotalPages();
        long totalElements = productPage.getTotalElements();
        return new PaginationResponse("Product list fetched successfully", dto, 200, currentPage, totalPages, totalElements);
    }

    @Override
    public PaginationResponse getProductsByFilters(Long colorId, Long sizeId, int page, int size, Double minPrice, Double maxPrice, Boolean gender) {
        try {
            if (colorId != null && sizeId != null && gender != null) {
                Optional<Color> color = colorRepository.findById(colorId);
                Optional<Size> size1 = sizeRepository.findById(sizeId);
                Page<Product> productPage = productRepository.findByColorsOrSizesOrGender(color.get(), size1.get(), gender, PageRequest.of(page, size));
                return paginationResponseHandler(productPage);
            } else if (colorId != null && sizeId != null) {
                Optional<Color> color = colorRepository.findById(colorId);
                Optional<Size> size1 = sizeRepository.findById(sizeId);
                Page<Product> productPage = productRepository.findByColorsOrSizes(color.get(), size1.get(), PageRequest.of(page, size));
                return paginationResponseHandler(productPage);
            } else if (sizeId != null && gender != null) {
                Optional<Size> size1 = sizeRepository.findById(sizeId);
                Page<Product> productPage = productRepository.findBySizesOrGender(size1.get(), gender, PageRequest.of(page, size));
                return paginationResponseHandler(productPage);
            } else if (colorId != null && gender != null) {
                Optional<Color> color = colorRepository.findById(colorId);
                Page<Product> productPage = productRepository.findByColorsOrGender(color.get(), gender, PageRequest.of(page, size));
                return paginationResponseHandler(productPage);
            } else if (colorId != null) {
                Optional<Color> color = colorRepository.findById(colorId);
                Page<Product> productPage = productRepository.findByColors(color.get(), PageRequest.of(page, size));
                return paginationResponseHandler(productPage);
            } else if (sizeId != null) {
                Optional<Size> size1 = sizeRepository.findById(sizeId);
                Page<Product> productPage = productRepository.findBySizes(size1.get(), PageRequest.of(page, size));
                return paginationResponseHandler(productPage);
            } else {
                Page<Product> productPage = productRepository.findAll(PageRequest.of(page, size));
                return paginationResponseHandler(productPage);
            }
        } catch (Exception e) {
            return new PaginationResponse("Error getting product list", null, 500, 0, 0, 0);
        }
    }

    @Override
    public PaginationResponse getProductsBySearchTerm(String searchTerm, Integer page, Integer size) {
        try {
            Page<Product> productPage = productRepository.searchProduct(PageRequest.of(page, size), searchTerm);
            return paginationResponseHandler(productPage);
        } catch (Exception e) {
            return new PaginationResponse("Error getting product list", null, 500, 0, 0, 0);
        }
    }

    @Override
    public PaginationResponse getProductsByPriceRange(String minPrice, String maxPrice, Integer page, Integer size) {
        try {
            Page<Product> productPage = productRepository.getByPrice(PageRequest.of(page, size), minPrice, maxPrice);
            return paginationResponseHandler(productPage);
        } catch (Exception e) {
            return new PaginationResponse("Error getting product list", null, 500, 0, 0, 0);
        }
    }

    @Override
    public BaseResponse update(Long id, String name, String description, Double price, Long categoryId, List<Long> colorIds, List<Long> sizeIds, List<MultipartFile> images, Integer quantity, Boolean status, Boolean gender , Integer salePercentage) {
        try {
            Optional<Product> entity = productRepository.findById(id);
            if (!entity.isPresent()) {
                return new BaseResponse("Product is not found", null, 400);
            }
            entity.get().setName(name);
            entity.get().setDescription(description);
            entity.get().setSalePercentage(salePercentage);
            entity.get().setPrice(price);
            entity.get().setGender(gender);
            entity.get().setQuantity(quantity);
            entity.get().setStatus(status);
            entity.get().setColors(null);
            entity.get().setSizes(null);
            Optional<Category> category = categoryRepository.findById(categoryId);
            if (category.isEmpty()) {
                return new BaseResponse("Category is not found", null, 400);
            }
            entity.get().setCategories(category.get());

            List<Color> colors = colorRepository.findAllById(colorIds);
            if (colors.isEmpty()) {
                return new BaseResponse("Color(s) not found", null, 400);
            }
            List<Size> sizes = sizeRepository.findAllById(sizeIds);
            if (sizes.isEmpty()) {
                return new BaseResponse("Size(s) not found", null, 400);
            }
            Product savedProduct = productRepository.save(entity.get());
            for (Color color : colors) {
                ProductColor productColor = new ProductColor();
                productColor.setProduct(savedProduct);
                productColor.setColor(color);
                productColorRepository.save(productColor);
            }
            for (Size size : sizes) {
                ProductSize productSize = new ProductSize();
                productSize.setProduct(savedProduct);
                productSize.setSize(size);
                productSizeRepository.save(productSize);
            }
            List<String> fileNames = fileHandler.saveUploadedFile(images);
            for (String fileName : fileNames) {
                Image image = new Image();
                image.setImageUrl(fileName);
                Image image1 = imageRepository.save(image);
                ProductImage productImage = new ProductImage();
                productImage.setProduct(savedProduct);
                productImage.setImage(image1);
                productImageRepository.save(productImage);
            }
            return new BaseResponse("Product saved successfully", savedProduct, 200);
        } catch (Exception e) {
            return new BaseResponse("Error saving product", null, 500);
        }
    }

    @Override
    public BaseResponse stop(Long id) {
        try {
            Optional<Product> entity = productRepository.findById(id);
            if (!entity.isPresent()) {
                return new BaseResponse("Product is not found", null, 400);
            }
            entity.get().setStatus(!entity.get().getStatus());
            productRepository.save(entity.get());
            return new BaseResponse("Product stopped successfully", entity.get(), 200);
        } catch (Exception e) {
            return new BaseResponse("Error saving product", null, 500);
        }
    }

    public PaginationResponse getProductsByFilter(FilterForm filter) {
        try {
            // Chuyển các tham số tìm kiếm thành Specifications
            Specification<Product> spec = Specification.where(ProductSpecifications.hasCategories(categoryRepository.findAllById(filter.getCategories())))
                    .and(ProductSpecifications.hasSizes(sizeRepository.findAllById(filter.getSizes())))
                    .and(ProductSpecifications.hasPriceLessThan(filter.getPrice()));

            // Thực hiện tìm kiếm với Specifications và pagination
            Page<Product> productPage = productRepository.findAll(spec, PageRequest.of(filter.getPage(), filter.getSize()));

            // Map các sản phẩm sang DTO
            List<ProductDto> dto = productPage.getContent().stream().map(this::mapToProductDto).collect(Collectors.toList());

           return new PaginationResponse("Product list fetched successfully", dto, 200, productPage.getNumber() + 1, productPage.getTotalPages(), productPage.getTotalElements());

        } catch (Exception e) {
            return new PaginationResponse("Error getting product list", null, 500, 0, 0, 0);
        }
    }

    @Override
    public PaginationResponse getProductsByCategory(Long id, Integer page, Integer size) {
        try {
            Optional<Category> category = categoryRepository.findById(id);
            if (category.isEmpty()) {
                return new PaginationResponse("Category not found", null, 400, 0, 0, 0);
            }
            Page<Product> productPage = productRepository.findByCategories(category.get(), PageRequest.of(page, size));

            return paginationResponseHandler(productPage);

        }catch (Exception e){
            return new PaginationResponse("Error getting product list", null, 500, 0, 0, 0);
        }
    }

    @Override
    public PaginationResponse searchProduct(String searchValue, int page, int limit) {
        try {
            PageRequest pageable = PageRequest.of(page, limit);
            Page<Product> products;

            if (searchValue != null && !searchValue.trim().isEmpty()) {
                // Filter products by searchValue
                products = productRepository.findByNameContainingIgnoreCase(searchValue, pageable);
            } else {
                // Get all products if no searchValue is provided
                products = productRepository.findAll(pageable);
            }

            // Map to DTOs
            List<ProductDto> dto = products.getContent().stream().map(this::mapToProductDto).toList();

            // Return PaginationResponse with pagination details
            return new PaginationResponse(
                    "Products retrieved successfully",
                    dto,
                    200,
                    products.getNumber(),               // currentPage
                    products.getTotalPages(),           // totalPages
                    products.getTotalElements()         // totalElements
            );
        } catch (Exception e) {
            return new PaginationResponse("Error retrieving products", null, 500, page, 0, 0);
        }
    }

    public List<ProductTopDTO> getTop10BestSellingProducts() {
        return productRepository.findTop10ByOrderBySoldDesc()
                .stream()
                .map(product -> new ProductTopDTO(product.getName(), product.getSold()))
                .collect(Collectors.toList());
    }
}
