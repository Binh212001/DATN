package org.example.yodybe.dto;

import lombok.Data;
import lombok.Value;
import org.example.yodybe.entity.Cart;
import org.example.yodybe.entity.InvoiceStatus;
import org.example.yodybe.entity.User;

import java.io.Serializable;
import java.util.List;

/**
 * DTO for {@link org.example.yodybe.entity.Invoice}
 */
@Data
public class InvoiceDto implements Serializable {
    Long id;
    Double totalAmount;
    User user;
    List<Cart> invoiceItems;
    InvoiceStatus status;
}