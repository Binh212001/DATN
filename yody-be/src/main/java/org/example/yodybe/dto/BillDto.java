package org.example.yodybe.dto;

import jakarta.validation.constraints.*;
import lombok.Builder;
import lombok.Value;

import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.List;

/**
 * DTO for {@link Bill}
 */
@Value
@Builder
public class BillDto implements Serializable {
    @NotNull
    Long id;
    @NotNull
    @NotEmpty
    @NotBlank
    String customerName;
    @NotNull
    @NotEmpty
    @NotBlank
    String province;
    @NotNull
    @NotEmpty
    @NotBlank
    String district;
    @NotNull
    @NotEmpty
    @NotBlank
    String addressDetail;
    @NotNull
    @NotEmpty
    @NotBlank
    String phone;
    @NotNull
    Double totalPrice;
    @NotNull
    LocalDateTime createdAt;
    @NotNull
    LocalDateTime updatedAt;
    @NotNull
    List<ProductBillDto> productBills;
}