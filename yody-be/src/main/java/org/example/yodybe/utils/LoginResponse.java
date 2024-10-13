package org.example.yodybe.utils;

import lombok.AllArgsConstructor;
import lombok.Data;
import org.example.yodybe.entity.User;

@Data
@AllArgsConstructor
public class LoginResponse {
    private String token;
    private User user;
}
