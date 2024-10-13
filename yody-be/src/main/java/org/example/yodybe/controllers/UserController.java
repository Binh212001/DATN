package org.example.yodybe.controllers;


import jakarta.validation.Valid;
import org.example.yodybe.entity.CustomUserDetails;
import org.example.yodybe.entity.User;
import org.example.yodybe.form.LoginRequest;
import org.example.yodybe.form.UserForm;
import org.example.yodybe.repositoties.UserRepository;
import org.example.yodybe.service.JwtTokenProvider;
import org.example.yodybe.service.UserService;
import org.example.yodybe.utils.LoginResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/user")
public class UserController {
    @Autowired
    private UserService userService;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private JwtTokenProvider tokenProvider;
    @Autowired
    AuthenticationManager authenticationManager;
    @Autowired
    PasswordEncoder passwordEncoder;

    @PostMapping("/login")
    public ResponseEntity authenticateUser(@Valid @RequestBody LoginRequest loginRequest) {
        try {
            // Xác thực từ username và password.
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            loginRequest.getUsername(),
                            loginRequest.getPassword()
                    )
            );

            // Nếu không xảy ra exception tức là thông tin hợp lệ
            // Set thông tin authentication vào Security Context
            SecurityContextHolder.getContext().setAuthentication(authentication);

            // Trả về jwt cho người dùng.
            String jwt = tokenProvider.generateToken((CustomUserDetails) authentication.getPrincipal());
            String username = tokenProvider.getUsernameFromJWT(jwt);
            User user = userRepository.findByUsername(username);
            return ResponseEntity.ok(new LoginResponse(jwt, user));

        }catch (Exception e){
                return  ResponseEntity.badRequest().body("Tài khoản hoặc mật khẩu không chính xác");
        }
    }

    @PostMapping("/register")
    public ResponseEntity registerUser(@Valid @RequestBody UserForm userForm) {

        // Kiểm tra username đã tồn tại chưa
        if (userRepository.existsByUsername(userForm.getUsername())) {
            return ResponseEntity.badRequest().body("Username is already taken!");
        }
        User user = new User();
        user.setUsername(userForm.getUsername());
        user.setPassword(passwordEncoder.encode(userForm.getPassword()));
        user.setFullName(userForm.getFullName());
        // Tạo user mới và lưu vào database
        User newUser = userRepository.save(user);

        // Xác thực từ username và password.
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        newUser.getUsername(),
                        userForm.getPassword()
                )
        );

        // Nếu không xảy ra exception tức là thông tin h��p lệ
        // Set thông tin authentication vào Security Context
        SecurityContextHolder.getContext().setAuthentication(authentication);

        // Trả về jwt cho người dùng.
        String jwt = tokenProvider.generateToken((CustomUserDetails) authentication.getPrincipal());
        return ResponseEntity.ok(new LoginResponse(jwt, newUser));
    }
}
