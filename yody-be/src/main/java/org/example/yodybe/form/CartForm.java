package org.example.yodybe.form;

import jakarta.annotation.Nullable;
import lombok.Data;

import java.io.Serializable;

/**
 * DTO for {@link org.example.yodybe.entity.Cart}
 */
@Data
public class CartForm implements Serializable {
    @Nullable
    private Long id;
    private Double totalPrice;
    private Integer quantity;
    private Long userId;
    private Long productId;
    private  String size;
    private String color;
    private Boolean status;
}
