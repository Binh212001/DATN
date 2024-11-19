package org.example.yodybe.service;

import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.CriteriaQuery;
import jakarta.persistence.criteria.Root;
import org.example.yodybe.entity.Category;
import org.example.yodybe.entity.Product;
import org.example.yodybe.entity.Size;
import org.springframework.data.jpa.domain.Specification;
import java.util.List;

public class ProductSpecifications {

    // Specification for categories
    public static Specification<Product> hasCategories(List<Category> categories) {
        return (Root<Product> root, CriteriaQuery<?> query, CriteriaBuilder cb) -> {
            if (categories != null && !categories.isEmpty()) {
                return root.join("categories").in(categories);
            }
            return cb.conjunction(); // Return a no-op if no categories are provided
        };
    }

    // Specification for sizes
    public static Specification<Product> hasSizes(List<Size> sizes) {
        return (Root<Product> root, CriteriaQuery<?> query, CriteriaBuilder cb) -> {
            if (sizes != null && !sizes.isEmpty()) {
                return root.join("sizes").in(sizes);
            }
            return cb.conjunction(); // Return a no-op if no sizes are provided
        };
    }

    // Specification for price
    public static Specification<Product> hasPriceLessThan(Double price) {
        return (Root<Product> root, CriteriaQuery<?> query, CriteriaBuilder cb) -> {
            if (price != null) {
                return cb.lessThanOrEqualTo(root.get("price"), price);
            }
            return cb.conjunction(); // Return a no-op if no price is provided
        };
    }
}
