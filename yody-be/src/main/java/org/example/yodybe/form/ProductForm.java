package org.example.yodybe.form;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import org.example.yodybe.entity.Product;
import org.springframework.web.multipart.MultipartFile;
import java.util.List;
@Getter
@Setter
public class ProductForm {

    private Long id;
    @NotNull
    @NotEmpty
    @NotBlank
    private String name;
    @NotNull
    @NotEmpty
    @NotBlank
    private String description;
    @NotNull
    @NotEmpty
    @NotBlank
    private Double price;
    private Integer quantity;
    private List<Long> categories;
    private List<Long> colors;
    private List<Long> sizes;
    private Boolean status;
    private List<MultipartFile> images;
    private Integer salePercentage;

    public Product mapEntity(){
        Product entity = new Product();
        entity.setId(this.id);
        entity.setName(this.name);
        entity.setDescription(this.description);
        entity.setPrice(this.price);
        entity.setQuantity(this.quantity);
        entity.setSalePercentage(this.salePercentage);
        return entity;
    }
}
