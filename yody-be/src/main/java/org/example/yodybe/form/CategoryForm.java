package org.example.yodybe.form;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.Value;

import java.io.Serializable;

/**
 * DTO for {@link org.example.yodybe.entity.Color}
 */
@Value
public class CategoryForm implements Serializable {
    Long id;
    @NotNull
    @NotEmpty
    @NotBlank
    String name;
    @NotNull
    @NotEmpty
    @NotBlank
    String slug;
}