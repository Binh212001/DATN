package org.example.yodybe.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import org.example.yodybe.entity.Category;
import org.example.yodybe.entity.Color;
import org.example.yodybe.entity.Image;
import org.example.yodybe.entity.Size;

import java.io.Serializable;
import java.util.List;

/**
 * DTO for {@link org.example.yodybe.entity.Product}
 */
@Builder
@Getter
@Setter
public class ProductDto implements Serializable {
    private Long id;
    private String name;
    private String description;
    private Double price;
    private Category categories;
    private List<Image> images;
    private List<Color> colors;
    private List<Size> sizes;
}