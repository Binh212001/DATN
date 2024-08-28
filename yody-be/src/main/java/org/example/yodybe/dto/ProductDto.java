package org.example.yodybe.dto;

import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import lombok.Value;
import org.example.yodybe.entity.*;

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