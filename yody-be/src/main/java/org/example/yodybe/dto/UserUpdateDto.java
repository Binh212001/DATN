package org.example.yodybe.dto;

import lombok.Data;
import org.example.yodybe.entity.Role;
import org.springframework.web.multipart.MultipartFile;

@Data
public class UserUpdateDto {
    private String username;
    private String fullName;
    private String phone;
    private String addressDetail;
    private MultipartFile avatar; // To handle file upload
    private String district;
    private String province;
    private Role role;
    private Boolean active;

    // Getters and Setters
}
