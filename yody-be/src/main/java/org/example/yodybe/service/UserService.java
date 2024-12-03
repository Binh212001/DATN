package org.example.yodybe.service;


import jakarta.transaction.Transactional;
import org.example.yodybe.entity.CustomUserDetails;
import org.example.yodybe.entity.Invoice;
import org.example.yodybe.entity.Role;
import org.example.yodybe.entity.User;
import org.example.yodybe.repositoties.InvoiceRepository;
import org.example.yodybe.repositoties.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.List;
import java.util.Optional;

@Service
public class UserService implements UserDetailsService {

    @Autowired
    private UserRepository userRepository;
    @Value("${resources.images.directory}")
    private String uploadDir;
    @Autowired
    private InvoiceRepository invoiceRepository;

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

        String fileName = file.getOriginalFilename();
        File destinationFile = new File(directory, fileName);

        file.transferTo(destinationFile);

        return fileName; // Adjust based on your application's context
    }


    public List<User> getUsersByRole(Role role, Long orderId) {
        Optional<Invoice> invoice = invoiceRepository.findById(orderId);
        String  district = invoice.get().getDistrict();
            return userRepository.findByRoleAndDistrict(role, district);
    }
}
