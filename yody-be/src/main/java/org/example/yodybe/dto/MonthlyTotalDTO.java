package org.example.yodybe.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class MonthlyTotalDTO {
    private Integer month;
    private Integer year;
    private Double totalAmount;
}