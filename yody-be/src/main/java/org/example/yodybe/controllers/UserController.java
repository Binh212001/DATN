package org.example.yodybe.controllers;


import jakarta.validation.Valid;
import org.example.yodybe.entity.CustomUserDetails;
import org.example.yodybe.form.LoginRequest;
import org.example.yodybe.service.JwtTokenProvider;
import org.example.yodybe.service.UserService;
import org.example.yodybe.utils.LoginResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
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
    private JwtTokenProvider tokenProvider;
    @Autowired
    AuthenticationManager authenticationManager;
    @PostMapping("/login")
    public LoginResponse authenticateUser(@Valid @RequestBody LoginRequest loginRequest) {

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
        return new LoginResponse(jwt);
    }

    // Get all users
//    @GetMapping("/users")
//    public ResponseEntity<BaseResponse> getAllUsers() {
//        return ResponseEntity.ok(userService.getAllUsers());
//    }
//
//    // Get user by id
//    @GetMapping("/users/{id}")
//    public ResponseEntity<BaseResponse> getUserById(@PathVariable Long id) {
//        return ResponseEntity.ok(userService.getUserById(id));
//    }
//    //login
//    @PostMapping("/login")
//    public ResponseEntity<BaseResponse> login(@RequestBody UserForm userForm) {
//        return ResponseEntity.ok(userService.login(userForm));
//    }
//    //register
//    @PostMapping("/register")
//    public ResponseEntity<BaseResponse> register(@RequestBody UserForm userForm) {
//        return ResponseEntity.ok(userService.register(userForm));
//    }
//    //update user
//    @PutMapping("/users/{id}")
//    public ResponseEntity<BaseResponse> updateUser(@PathVariable Long id, @RequestBody UserForm userDetails) {
//        return ResponseEntity.ok(userService.updateUser(id, userDetails));
//    }
}
