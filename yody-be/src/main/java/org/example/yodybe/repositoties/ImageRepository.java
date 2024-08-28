package org.example.yodybe.repositoties;

import org.example.yodybe.entity.Image;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ImageRepository extends JpaRepository<Image, Long> {
    List<Image> findByImageUrl(String fileNames);
    void deleteByImageUrl(String imageUrl);
}