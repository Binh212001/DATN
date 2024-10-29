package org.example.yodybe.form;

import lombok.Value;
import org.example.yodybe.entity.InvoiceStatus;
import org.example.yodybe.entity.Payment;

import java.io.Serializable;
import java.util.List;

/**
 * DTO for {@link org.example.yodybe.entity.Invoice}
 */
@Value
public class InvoiceForm implements Serializable {
    Long id;
    Double totalAmount;
    InvoiceStatus status;
    Long userId;
    List<Long> cartId ;
    Payment payment;
}