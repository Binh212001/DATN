package org.example.yodybe.entity;


import jakarta.persistence.*;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Cart {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Double totalPrice;
    private Integer quantity;
    @ManyToOne
    private User user;
    @OneToOne
    @JoinColumn(name = "product_id")
    private  Product product;
    private  Boolean status;

    @PrePersist
    public  void  onCreate() {
        this.status = true;
    }
}
