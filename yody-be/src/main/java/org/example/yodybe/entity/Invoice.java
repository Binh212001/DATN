package org.example.yodybe.entity;


import jakarta.persistence.*;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

import java.util.List;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Invoice {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Double totalAmount;
    @ManyToOne
    private User user;
    @OneToMany
    private List<Cart> invoiceItems;
    @Enumerated(EnumType.STRING)
    private  InvoiceStatus status;
    @PrePersist
    public void prePersist() {
        this.status = InvoiceStatus.PENDING;
    }

}
