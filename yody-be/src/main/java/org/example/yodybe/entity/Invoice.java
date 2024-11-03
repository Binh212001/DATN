package org.example.yodybe.entity;

import jakarta.annotation.Nullable;
import jakarta.persistence.*;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDateTime;
import java.util.Date;
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
    @Nullable
    @ManyToOne
    private User shipper;
    @ManyToMany
    private List<Cart> invoiceItems;
    @Enumerated(EnumType.STRING)
    private Payment payment;
    @Enumerated(EnumType.STRING)
    private  InvoiceStatus status;
    private Date createdDate;
    @PrePersist
    public void prePersist() {
        this.status = InvoiceStatus.PENDING;
        this.createdDate = new Date();
    }
}