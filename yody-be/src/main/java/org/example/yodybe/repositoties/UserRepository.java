package org.example.yodybe.repositoties;

import org.example.yodybe.entity.Role;
import org.example.yodybe.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface UserRepository extends JpaRepository<User, Long> {
    User findByUsername(String username);
    boolean existsByUsername(String username);
    Page<User> findByFullNameContains(String searchTerm, Pageable pageable);
    List<User> findByRole(Role role);
}
