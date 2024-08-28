package org.example.yodybe.form;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.Value;

import java.io.Serializable;

/**
 * DTO for {@link org.example.yodybe.entity.Collection}
 */
@Value
public class CollectionForm implements Serializable {
    Long id;
    @NotNull
    @NotEmpty
    @NotBlank
    String name;
}