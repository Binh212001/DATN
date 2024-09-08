package org.example.yodybe.controllers;


import org.example.yodybe.form.CategoryForm;
import org.example.yodybe.service.CategoryService;
import org.example.yodybe.utils.BaseResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/categories")
public class CategoryController {
    @Autowired
    private CategoryService categoryService;

    @GetMapping
    public ResponseEntity<BaseResponse> getAllCategorys() {
        return ResponseEntity.ok(categoryService.getAllCategorys());
    }
    @GetMapping("/{id}")
    public ResponseEntity<BaseResponse> getCategoryById(@PathVariable Long id) {
        return ResponseEntity.ok(categoryService.getCategoryById(id));
    }
    @PostMapping
    public ResponseEntity<BaseResponse> createCategory(@RequestBody CategoryForm category) {
        return ResponseEntity.ok(categoryService.saveCategory(category));
    }
    @PutMapping("/{id}")
    public ResponseEntity<BaseResponse> updateCategory(@PathVariable Long id, @RequestBody CategoryForm categoryDetails) {
        return ResponseEntity.ok(categoryService.updateCategory(id, categoryDetails));
    }
    @DeleteMapping
    public ResponseEntity<BaseResponse> deleteCategory(@RequestBody List<Long> ids) {
        return ResponseEntity.ok(categoryService.deleteCategory(ids));
    }
}
