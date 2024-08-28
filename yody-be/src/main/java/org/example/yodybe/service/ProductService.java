package org.example.yodybe.service;

import org.example.yodybe.dto.ProductDto;
import org.example.yodybe.entity.Product;
import org.example.yodybe.utils.BaseResponse;
import org.example.yodybe.utils.PaginationResponse;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface ProductService {
    BaseResponse save(String name, String description, Double price, Long categoryId, List<Long> colorIds, List<Long> sizeIds, List<MultipartFile> images);

    PaginationResponse getProductList(Integer page, Integer size);

    ProductDto mapToProductDto(Product product);

    BaseResponse getProductById(Long id);

    PaginationResponse getProductsByFilters(  Long colorId, Long sizeId, int page, int size, Double minPrice, Double maxPrice, Boolean gender );

    PaginationResponse getProductsBySearchTerm(String searchTerm, Integer page, Integer size);

    PaginationResponse getProductsByPriceRange(String minPrice, String maxPrice, Integer page, Integer size);

    BaseResponse update(Long id, String name, String description, Double price, Long categoryId, List<Long> colorIds, List<Long> sizeIds, List<MultipartFile> images);
}
