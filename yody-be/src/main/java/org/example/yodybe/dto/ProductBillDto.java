package org.example.yodybe.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.example.yodybe.entity.Product;

import java.io.Serializable;

@Getter
@Setter

public class ProductBillDto implements Serializable {
    private Long id;
    private ProductDto product;
    private Double price;
    private Integer quantity;
    private Long sizeId;
    private Long colorId;
}
