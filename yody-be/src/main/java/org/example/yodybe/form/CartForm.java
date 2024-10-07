package org.example.yodybe.form;

import lombok.Data;

import java.io.Serializable;

/**
 * DTO for {@link org.example.yodybe.entity.Cart}
 */
@Data
public class CartForm implements Serializable {
    private Long id;
    private Double totalPrice;
    private Integer quantity;
    private Long userId;
    private Long productId;
    private  Boolean status;
}
