package org.example.yodybe.controllers;


import jakarta.validation.Valid;
import org.example.yodybe.dto.UserUpdateDto;
import org.example.yodybe.entity.CustomUserDetails;
import org.example.yodybe.entity.Role;
import org.example.yodybe.entity.User;
import org.example.yodybe.form.LoginRequest;
import org.example.yodybe.form.UserForm;
import org.example.yodybe.repositoties.UserRepository;
import org.example.yodybe.service.JwtTokenProvider;
import org.example.yodybe.service.UserService;
import org.example.yodybe.utils.BaseResponse;
import org.example.yodybe.utils.LoginResponse;
import org.example.yodybe.utils.PaginationResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.context.config.ConfigDataResourceNotFoundException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.UUID;

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
    @Value("${resources.images.directory}")
    private String uploadDir;
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
            SecurityContextHolder.getContext().setAuthentication(authentication);
            String jwt = tokenProvider.generateToken((CustomUserDetails) authentication.getPrincipal());
            String username = tokenProvider.getUsernameFromJWT(jwt);
            User user = userRepository.findByUsername(username);
            return ResponseEntity.ok(new LoginResponse(jwt, user));

        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Tài khoản hoặc mật khẩu không chính xác");
        }
    }

    @PostMapping("/register")
    public ResponseEntity registerUser(@Valid @RequestBody UserForm userForm) {
        if (userRepository.existsByUsername(userForm.getUsername())) {
            return ResponseEntity.badRequest().body("Username is already taken!");
        }
        User user = new User();
        user.setUsername(userForm.getUsername());
        user.setPassword(passwordEncoder.encode(userForm.getPassword()));
        user.setFullName(userForm.getFullName());
        User newUser = userRepository.save(user);

        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        newUser.getUsername(),
                        userForm.getPassword()
                )
        );
        SecurityContextHolder.getContext().setAuthentication(authentication);

        String jwt = tokenProvider.generateToken((CustomUserDetails) authentication.getPrincipal());
        return ResponseEntity.ok(new LoginResponse(jwt, newUser));
    }

    private PaginationResponse paginationResponseHandler(Page<User> users) {
        int currentPage = users.getPageable().getPageNumber();
        int totalPages = users.getTotalPages();
        long totalElements = users.getTotalElements();
        return new PaginationResponse("ok", users.getContent(), 200, currentPage, totalPages, totalElements);
    }

    @GetMapping
    public ResponseEntity<BaseResponse> getAll(@RequestParam(value = "searchTerm", defaultValue = "") String searchTerm
    ) {
        List<User> users;
        if (searchTerm.isEmpty()) {
            users = userRepository.findAll();
        } else {
            users = userRepository.findByFullNameContains(searchTerm);
        }
        return ResponseEntity.ok(new BaseResponse("Get all user" ,users, 200));
    }

    @PutMapping("/{id}")
    public ResponseEntity<String> updateUser(@PathVariable Long id,
                                             @RequestParam String fullName,
                                             @RequestParam String phone,
                                             @RequestParam String addressDetail,
                                             @RequestParam(required = false) MultipartFile avatar,
                                             @RequestParam String district,
                                             @RequestParam String province,
                                             @RequestParam Role role,
                                             @RequestParam Boolean active) {
        User user = userRepository.findById(id).orElseThrow(() -> new UsernameNotFoundException("User not found"));
        user.setFullName(fullName);
        user.setPhone(phone);
        user.setAddressDetail(addressDetail);
        user.setDistrict(district);
        user.setProvince(province);
        user.setRole(role);
        user.setActive(active);

        // Handle avatar file upload

        if (avatar != null && !avatar.isEmpty()) {
            try {
                // Save the file to the server
                byte[] bytes = avatar.getBytes();
                String fileName = UUID.randomUUID() +avatar.getOriginalFilename();
                String urlPath = uploadDir +fileName;
                Path path = Paths.get(urlPath);
                Files.write(path, bytes);
                // Store the file path or URL in the user entity
                user.setAvatar(fileName); // Or store a relative path if needed
            } catch (Exception e) {
                return ResponseEntity.status(500).body("Error uploading file: " + e.getMessage());
            }
        }
        // Save the updated user
        userRepository.save(user);
        return ResponseEntity.ok("User updated successfully");
    }

    @GetMapping("/{id}")
    public  ResponseEntity getUser(@PathVariable Long id){
        // Find the user by ID
        User user = userRepository.findById(id).orElseThrow(() -> new UsernameNotFoundException("User not found"));
        return ResponseEntity.ok(user);
    }
    @GetMapping("/role/{role}")
    public List<User> getUsersByRole(@PathVariable Role role) {
        return userService.getUsersByRole(role);
    }
}
