package org.example.yodybe.dto;

import lombok.Data;
import lombok.Value;

import java.io.Serializable;

/**
 * DTO for {@link org.example.yodybe.entity.Cart}
 */
@Data
public class CartDto implements Serializable {
    Long id;
    Double totalPrice;
    Double price;
    Integer quantity;
    UserDto user;
    ProductDto product;
}
