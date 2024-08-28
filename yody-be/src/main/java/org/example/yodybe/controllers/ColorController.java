package org.example.yodybe.controllers;


import org.example.yodybe.entity.Color;
import org.example.yodybe.form.ColorForm;
import org.example.yodybe.service.ColorService;
import org.example.yodybe.utils.BaseResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/colors")
public class ColorController {
    @Autowired
    private ColorService colorService;

    @GetMapping
    public ResponseEntity<BaseResponse> getAllColors() {
        return ResponseEntity.ok(colorService.getAllColors());
    }
    @GetMapping("/{id}")
    public ResponseEntity<BaseResponse> getColorById(@PathVariable Long id) {
        return ResponseEntity.ok(colorService.getColorById(id));
    }
    @PostMapping
    public ResponseEntity<BaseResponse> createColor(@RequestBody ColorForm color) {
        return ResponseEntity.ok(colorService.saveColor(color));
    }
    @PutMapping("/{id}")
    public ResponseEntity<BaseResponse> updateColor(@PathVariable Long id, @RequestBody ColorForm colorDetails) {
        return ResponseEntity.ok(colorService.updateColor(id, colorDetails));
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<BaseResponse> deleteColor(@PathVariable Long id) {
        return ResponseEntity.ok(colorService.deleteColor(id));
    }
}
