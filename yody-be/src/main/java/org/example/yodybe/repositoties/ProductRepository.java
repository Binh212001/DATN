package org.example.yodybe.repositoties;

import org.example.yodybe.entity.Category;
import org.example.yodybe.entity.Color;
import org.example.yodybe.entity.Product;
import org.example.yodybe.entity.Size;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {
    @Query("select p from Product  p  ")
    Page<Product> getProductList(Pageable pageable);

    @Query("select p from Product  p  where p.categories.id = :categoryId")
    Page<Product> getProductListByCategory(Pageable pageable, Long categoryId);

    Page<Product> findByColorsOrSizesOrGender(Color color, Size size, Boolean gender, Pageable pageable);

    Page<Product> findByColors(Color color, Pageable pageable);

    Page<Product> findBySizes(Size size, Pageable pageable);

    @Query("SELECT p FROM Product p WHERE p.name LIKE %:searchTerm%")
    Page<Product> searchProduct(Pageable pageable, String searchTerm);

    @Query("SELECT p FROM Product p WHERE p.price BETWEEN :minPrice AND :maxPrice")
    Page<Product> getByPrice(Pageable pageable, String minPrice, String maxPrice);

    Page<Product> findByColorsOrSizes(Color color, Size size, Pageable pageable);

    Page<Product> findByColorsOrGender(Color color, Boolean gender, Pageable pageable);

    Page<Product> findBySizesOrGender(Size size, Boolean gender, Pageable pageable);

    List<Product> findBySizes(Size size);

    List<Product> findByColors(Color color);

    List<Product> findAllByOrderByCreatedAtAsc();


    @Query("SELECT p FROM Product p WHERE "
            + "(COALESCE(:sizes, NULL) IS NULL OR EXISTS (SELECT s FROM p.sizes s WHERE s.id IN :sizes)) AND "
            + "(COALESCE(:categories, NULL) IS NULL OR p.categories IN :categories) AND "
            + "(:price IS NULL OR p.price <= :price)")
    List<Product> findProductsByFilter(
            @Param("sizes") List<Long> sizes,
            @Param("categories") List<Long> categories,
            @Param("price") Double price,
            Pageable pageable);

    List<Product> findByCategoriesInAndSizesInAndPriceLessThan(List<Category> categories, List<Size> sizes, Double price, Pageable pageable);

    List<Product> findByCategoriesInAndSizesIn(List<Category> categories, List<Size> sizes, Pageable pageable);

    List<Product> findByCategoriesInAndPriceLessThan(List<Category> categories, Double price, Pageable pageable);

    List<Product> findBySizesInAndPriceLessThan(List<Size> sizes, Double price, Pageable pageable);

    List<Product> findByCategoriesIn(List<Category> categories, Pageable pageable);

    List<Product> findBySizesIn(List<Size> sizes, Pageable pageable);

    List<Product> findByPriceLessThan(Double price, Pageable pageable);

    Page<Product> findByCategories(Category category, Pageable pageable);

    List<Product> findBySalePercentageGreaterThan(Integer salePercentage);

    Page<Product> findByNameContainingIgnoreCase(String name, Pageable pageable);

    Page<Product> findAll(Specification<Product> spec, Pageable pageable);
    List<Product> findTop10ByOrderBySoldDesc();
}