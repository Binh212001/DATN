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
@Table(name = "invoice_details")
public class Cart {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Double totalPrice;
    private Integer quantity;
    @ManyToOne
    private User user;
    @ManyToOne
    private  Product product;
    private  Boolean status;
    private  String size;
    private String color;

    @ManyToOne
    private Invoice invoice;

    @PrePersist
    public  void  onCreate() {
        this.status = true;
    }
}
