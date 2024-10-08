package org.example.yodybe.controllers;

import org.example.yodybe.form.FilterForm;
import org.example.yodybe.service.ProductService;
import org.example.yodybe.utils.BaseResponse;
import org.example.yodybe.utils.PaginationResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/products")
public class ProductControllers {
    @Autowired
    ProductService productService;

    @GetMapping
    public ResponseEntity<PaginationResponse> getAllProducts(
            @RequestParam(value = "page", defaultValue = "0") Integer page,
            @RequestParam(value = "size", defaultValue = "20") Integer size
    ) {
        PaginationResponse paginationResponse = productService.getProductList(page, size);
        return ResponseEntity.ok(paginationResponse);
    }

    // POST /products
    @PostMapping
    public ResponseEntity<BaseResponse> createProduct(
            @RequestParam("name") String name,
            @RequestParam("description") String description,
            @RequestParam("price") String price,
            @RequestParam(value = "gender", required = false) Boolean gender,
            @RequestParam("quantity") int quantity,
            @RequestParam("category") String categoryId,
            @RequestParam("colors") List<String> colorIds,
            @RequestParam("sizes") List<String> sizeIds,
            @RequestParam("images") List<MultipartFile> images
    ) {
        BaseResponse savedProduct = productService.save(name, description, Double.parseDouble(price), Long.parseLong(categoryId), convertToLongList(colorIds), convertToLongList(sizeIds), images, quantity, gender);
        return ResponseEntity.ok(savedProduct);
    }

    // GET /products/{id}
    @GetMapping("/{id}")
    public ResponseEntity<BaseResponse> getProductById(@PathVariable Long id) {
        BaseResponse response = productService.getProductById(id);
        return ResponseEntity.ok(response);
    }

//    @GetMapping("/filter")
//    public ResponseEntity<BaseResponse> getProductsByFilters(
//            @RequestParam(required = false) Boolean gender,
//            @RequestParam(required = false) Long colorId,
//            @RequestParam(required = false) Long sizeId,
//            @RequestParam(defaultValue = "0") int page,
//            @RequestParam(defaultValue = "10") int size,
//            @RequestParam(value = "minPrice", required = false) Double minPrice,
//            @RequestParam(value = "maxPrice", required = false) Double maxPrice) {
//        BaseResponse response = productService.getProductsByFilters(colorId, sizeId, page, size, minPrice, maxPrice, gender);
//        return ResponseEntity.ok(response);
//    }
    // PUT /products/{id}

    @PostMapping("/filter")
    public ResponseEntity<BaseResponse> getProductsByFilters(
            @RequestBody FilterForm filter) {
        BaseResponse response = productService.getProductsByFilter(filter);
        return ResponseEntity.ok(response);
    }

    @PutMapping
    public ResponseEntity<BaseResponse> updateProduct(
            @RequestParam("id") Long id,
            @RequestParam("name") String name,
            @RequestParam("description") String description,
            @RequestParam("price") Double price,
            @RequestParam(value = "gender", required = false) Boolean gender,
            @RequestParam("quantity") Integer quantity,
            @RequestParam("status") Boolean status,
            @RequestParam("category") Long categoryId,
            @RequestParam("colors") List<Long> colorIds,
            @RequestParam("sizes") List<Long> sizeIds,
            @RequestParam(value = "images", required = false) List<MultipartFile> images) {
        BaseResponse savedProduct = productService.update(id, name, description, price, categoryId, colorIds, sizeIds, images, quantity, status, gender);
        return ResponseEntity.ok(savedProduct);
    }
    // DELETE /products/{id}

    // GET /products?priceRange={minPrice}-{maxPrice}
    @GetMapping("/priceRange")
    public ResponseEntity<PaginationResponse> getProductsByPriceRange(
            @RequestParam(value = "minPrice", required = false) String minPrice,
            @RequestParam(value = "maxPrice", required = false) String maxPrice,
            @RequestParam(value = "page", defaultValue = "0") Integer page,
            @RequestParam(value = "size", defaultValue = "20") Integer size) {
        PaginationResponse paginationResponse = productService.getProductsByPriceRange(minPrice, maxPrice, page, size);
        return ResponseEntity.ok(paginationResponse);
    }

    // GET /products/search?searchTerm=
    @GetMapping("/search")
    public ResponseEntity<PaginationResponse> getProductsBySearchTerm(
            @RequestParam(value = "searchTerm", required = false) String searchTerm,
            @RequestParam(value = "page", defaultValue = "0") Integer page,
            @RequestParam(value = "size", defaultValue = "20") Integer size) {
        PaginationResponse paginationResponse = productService.getProductsBySearchTerm(searchTerm, page, size);
        return ResponseEntity.ok(paginationResponse);
    }

    @GetMapping("/category/{id}")

    public ResponseEntity<PaginationResponse> getProductsByCategory(@PathVariable Long id,
                                                              @RequestParam(value = "page", defaultValue = "0") Integer page,
                                                              @RequestParam(value = "size", defaultValue = "20") Integer size) {
        PaginationResponse paginationResponse = productService.getProductsByCategory(id, page, size);
        return ResponseEntity.ok(paginationResponse);
    }



    @PutMapping("/stop/{id}")
    public ResponseEntity<BaseResponse> stop(@PathVariable Long id) {
        BaseResponse response = productService.stop(id);
        return ResponseEntity.ok(response);
    }

    public List<Long> convertToLongList(List<String> strings) {
        return strings.stream().map(Long::parseLong).collect(Collectors.toList());
    }


}
