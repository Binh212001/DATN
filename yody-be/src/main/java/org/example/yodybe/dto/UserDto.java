package org.example.yodybe.dto;

import lombok.Value;
import org.example.yodybe.entity.Role;

import java.io.Serializable;

/**
 * DTO for {@link org.example.yodybe.entity.User}
 */
@Value
public class UserDto implements Serializable {
    String username;
    String password;
    String fullName;
    String phone;
    String district;
    String provinceName;
    String districtName;
    String province;
    String addressDetail;
    String avatar;
    Role role;
    boolean active;
}