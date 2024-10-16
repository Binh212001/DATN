package org.example.yodybe.service;


import jakarta.transaction.Transactional;
import org.example.yodybe.entity.CustomUserDetails;
import org.example.yodybe.entity.User;
import org.example.yodybe.repositoties.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;

@Service
public class UserService implements UserDetailsService {

    @Autowired
    private UserRepository userRepository;
    @Value("${resources.images.directory}")
    private String uploadDir;

    @Override
    public CustomUserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        // Kiểm tra xem user có tồn tại trong database không?
        User user = userRepository.findByUsername(username);
        if (user == null) {
            throw new UsernameNotFoundException(username);
        }
        return CustomUserDetails.build(user);
    }

    @Transactional
    public User updateUser(Long id, User updatedUser) {
        User existingUser = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));

        existingUser.setUsername(updatedUser.getUsername());
        existingUser.setPassword(updatedUser.getPassword());
        existingUser.setFullName(updatedUser.getFullName());
        existingUser.setPhone(updatedUser.getPhone());
        existingUser.setDistrict(updatedUser.getDistrict());
        existingUser.setProvince(updatedUser.getProvince());
        existingUser.setAddressDetail(updatedUser.getAddressDetail());
        existingUser.setAvatar(updatedUser.getAvatar());
        existingUser.setActive(updatedUser.isActive());
        existingUser.setRole(updatedUser.getRole());

        return userRepository.save(existingUser);
    }


    @Transactional
    public User updateUser(Long id, User updatedUser, MultipartFile avatarFile) throws IOException {
        User existingUser = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));

        existingUser.setUsername(updatedUser.getUsername());
        existingUser.setPassword(updatedUser.getPassword());
        existingUser.setFullName(updatedUser.getFullName());
        existingUser.setPhone(updatedUser.getPhone());
        existingUser.setDistrict(updatedUser.getDistrict());
        existingUser.setProvince(updatedUser.getProvince());
        existingUser.setAddressDetail(updatedUser.getAddressDetail());
        existingUser.setActive(updatedUser.isActive());
        existingUser.setRole(updatedUser.getRole());

        // Handle the avatar file upload
        if (avatarFile != null && !avatarFile.isEmpty()) {
            String filePath = saveFile(avatarFile);
            existingUser.setAvatar(filePath);
        }

        return userRepository.save(existingUser);
    }

    private String saveFile(MultipartFile file) throws IOException {
        // Create the directory if it doesn't exist
        File directory = new File(uploadDir);
        if (!directory.exists()) {
            directory.mkdirs();
        }

        // Define the path and file name
        String fileName = file.getOriginalFilename();
        File destinationFile = new File(directory, fileName);

        // Copy the file to the destination
        file.transferTo(destinationFile);

        return  fileName; // Adjust based on your application's context
    }
}
