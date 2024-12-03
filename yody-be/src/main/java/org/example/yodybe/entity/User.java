package org.example.yodybe.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@Table(name = "users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(name = "username", unique = true)
    private String username;
    @Column(name = "password", nullable = false)
    private String password;
    private String fullName;
    private String phone;
    private String district;
    private  String provinceName;
    private  String districtName;
    private String province;
    private String addressDetail;
    private String avatar;
    @Enumerated(EnumType.STRING)
    private Role role;
    private boolean active;
}
