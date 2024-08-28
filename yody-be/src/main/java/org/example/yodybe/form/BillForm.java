package org.example.yodybe.form;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.io.Serializable;
import java.util.List;

/**
 * DTO for {@link org.example.yodybe.entity.ProductBill}
 */
@Getter
@Setter
@AllArgsConstructor

public class BillForm implements Serializable {
    Long id;
    @NotNull
    @NotBlank
    @NotEmpty
    private String customerName;
    private  String province;
    private String district;
    @NotNull
    @NotBlank
    @NotEmpty
    private String addressDetail;
    @NotNull
    @NotBlank
    @NotEmpty
    private  String phone;
    @NotNull
    @NotBlank
    @NotEmpty
    private Double totalPrice;
    private List< ProductBillForm> productBillForm;
}