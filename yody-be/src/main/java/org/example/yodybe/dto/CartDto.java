package org.example.yodybe.dto;

import lombok.Data;
import lombok.Value;
import org.example.yodybe.entity.Product;
import org.example.yodybe.entity.User;

import java.io.Serializable;

/**
 * DTO for {@link org.example.yodybe.entity.Cart}
 */
@Data
public class CartDto implements Serializable {
    Long id;
    Double totalPrice;
    Integer quantity;
    User user;
    Product product;
    private  Boolean status;
}
