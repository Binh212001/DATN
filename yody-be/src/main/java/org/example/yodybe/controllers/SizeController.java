package org.example.yodybe.controllers;


import org.example.yodybe.form.CategoryForm;
import org.example.yodybe.form.SizeForm;
import org.example.yodybe.service.CategoryService;
import org.example.yodybe.service.SizeService;
import org.example.yodybe.utils.BaseResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/sizes")
public class SizeController {
    @Autowired
    private SizeService sizeService;

    @GetMapping
    public ResponseEntity<BaseResponse> getAllSizes() {
        return ResponseEntity.ok(sizeService.getAllSizes());
    }
    @GetMapping("/{id}")
    public ResponseEntity<BaseResponse> getSizeById(@PathVariable Long id) {
        return ResponseEntity.ok(sizeService.getSizeById(id));
    }
    @PostMapping
    public ResponseEntity<BaseResponse> createSize(@RequestBody SizeForm category) {
        return ResponseEntity.ok(sizeService.saveSize(category));
    }
    @PutMapping("/{id}")
    public ResponseEntity<BaseResponse> updateSize(@PathVariable Long id, @RequestBody SizeForm categoryDetails) {
        return ResponseEntity.ok(sizeService.updateSize(id, categoryDetails));
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<BaseResponse> deleteSize(@PathVariable Long id) {
        return ResponseEntity.ok(sizeService.deleteSize(id));
    }
}
