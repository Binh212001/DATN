package org.example.yodybe.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class TopCustomerDto {
    private Long userId;
    private String fullName; // or full name if preferred
    private Double totalAmountSpent;
}
