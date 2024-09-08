package org.example.yodybe.service;

import jakarta.transaction.Transactional;
import org.example.yodybe.dto.CategoryDto;
import org.example.yodybe.dto.SizeDto;
import org.example.yodybe.entity.Category;
import org.example.yodybe.form.CategoryForm;
import org.example.yodybe.repositoties.CategoryRepository;
import org.example.yodybe.utils.BaseResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class CategoryServiceImpl implements CategoryService {
    @Autowired
    private CategoryRepository categoryRepository;

    @Override
    public BaseResponse getAllCategorys() {
        try {
            List<Category> categories = categoryRepository.findAll();
            List<CategoryDto> categoryDtos = categories.stream().map(this::createCategoryDto).collect(Collectors.toList());
            return new BaseResponse("Thành công", categoryDtos, 200);
        } catch (Exception e) {
            return new BaseResponse("Thất bại", true, 500);
        }
    }

    @Override
    public BaseResponse getCategoryById(Long id) {
        try {
            CategoryDto categoryDto = createCategoryDto(categoryRepository.findById(id).get());
            return new BaseResponse("Thành công", categoryDto, 200);
        } catch (Exception e) {
            return new BaseResponse("Thất bại", true, 500);
        }
    }

    @Override
    public BaseResponse saveCategory(CategoryForm categoryForm) {
        try {
            Category entity = mapToEntity(categoryForm);
            Category res = categoryRepository.save(entity);
            return new BaseResponse("Lưu thành công", res, 200);
        } catch (Exception e) {
            return new BaseResponse("Lưu thất bại", true, 500);
        }
    }

    @Transactional
    @Override
    public BaseResponse deleteCategory(List<Long> id) {
        try {
            for (Long i : id) {
                categoryRepository.deleteById(i);
            }
            return new BaseResponse("Xóa thành công", true, 200);
        } catch (Exception e) {
            return new BaseResponse("Danh mục đã được  gán cho sản phẩm. Hãy xóa sản phẩm trước.", false, 500);
        }
    }

    @Override
    public BaseResponse updateCategory(Long id, CategoryForm clCategoryForm) {
        try {
            Optional<Category> category = categoryRepository.findById(id);
            if (category.isEmpty()) {
                return new BaseResponse("Không tìm thấy màu " + clCategoryForm.getName(), false, 400);
            }
            category.get().setName(clCategoryForm.getName());
            Category category1 = categoryRepository.save(category.get());
            return new BaseResponse("Cập nhật thành công", category1, 200);
        } catch (Exception e) {
            return new BaseResponse("Cập nhật thất bại ", true, 500);
        }
    }

    @Override
    public CategoryDto createCategoryDto(Category category) {
        return CategoryDto.builder()
                .id(category.getId())
                .name(category.getName())
                .slug(category.getSlug())
                .build();
    }

    @Override
    public Category mapToEntity(CategoryForm categoryForm) {
        return Category.builder()
                .name(categoryForm.getName())
                .slug(categoryForm.getSlug())
                .build();
    }
}
