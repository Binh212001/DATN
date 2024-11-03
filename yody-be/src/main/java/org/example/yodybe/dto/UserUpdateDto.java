package org.example.yodybe.dto;

import jakarta.annotation.Nullable;
import lombok.Data;
import org.example.yodybe.entity.Role;
import org.springframework.web.multipart.MultipartFile;

import java.io.Serializable;

@Data
public class UserUpdateDto implements Serializable {
    private String username;
    private String fullName;
    private String phone;
    private String addressDetail;
    private MultipartFile avatar;
    private String district;
    private String province;
    private Role role;
    private Boolean active;
}
