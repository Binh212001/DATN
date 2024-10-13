package org.example.yodybe.controllers;


import org.example.yodybe.form.CartForm;
import org.example.yodybe.form.CategoryForm;
import org.example.yodybe.service.CartService;
import org.example.yodybe.service.CategoryService;
import org.example.yodybe.utils.BaseResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/carts")
public class CartController {
    @Autowired
    private CartService cartService;
    @GetMapping("/userId/{id}")
    public ResponseEntity<BaseResponse> getCartById(@PathVariable Long id) {
        return ResponseEntity.ok(cartService.getCartById(id));
    }
    @PostMapping
    public ResponseEntity<BaseResponse> createCart(@RequestBody CartForm cartForm) {
        return ResponseEntity.ok(cartService.saveCart(cartForm));
    }
    @PutMapping("/{id}")
    public ResponseEntity<BaseResponse> updateCart(@PathVariable Long id, @RequestBody CartForm cartDetails) {
        return ResponseEntity.ok(cartService.updateCart(id, cartDetails));
    }
}
