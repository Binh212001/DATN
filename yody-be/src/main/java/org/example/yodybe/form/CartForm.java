package org.example.yodybe.form;

import lombok.Data;
import lombok.Value;

import java.io.Serializable;

/**
 * DTO for {@link org.example.yodybe.entity.Cart}
 */
@Data
public class CartForm implements Serializable {
    Long id;
    Double totalPrice;
    Double price;
    Integer quantity;
}
