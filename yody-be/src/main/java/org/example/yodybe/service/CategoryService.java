package org.example.yodybe.service;

import org.example.yodybe.dto.CategoryDto;
import org.example.yodybe.dto.SizeDto;
import org.example.yodybe.entity.Category;
import org.example.yodybe.form.CategoryForm;
import org.example.yodybe.utils.BaseResponse;

import java.util.List;

public interface CategoryService {
    BaseResponse getAllCategorys();

    BaseResponse getCategoryById(Long id);

    BaseResponse saveCategory(CategoryForm color);

    BaseResponse deleteCategory(List<Long> ids);

    BaseResponse updateCategory(Long id, CategoryForm clCategoryForm);

    CategoryDto createCategoryDto(Category color);

    Category mapToEntity(CategoryForm colorForm);
}
