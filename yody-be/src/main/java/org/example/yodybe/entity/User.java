package org.example.yodybe.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
@Table(name = "users")
public class User {
    @Id
    @Column(name = "username", unique = true)
    private String username;
    @Column(name = "password", nullable = false)
    private String password;
    private String fullName;
    private String phone;
    private String district;
    private String province;
    private String addressDetail;
    private String avatar;
    @Enumerated(EnumType.STRING)
    private Role role;
    private boolean active;
    @PrePersist
    public void prePersist() {
       Role role = Role.USER;
    }
}
