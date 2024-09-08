package org.example.yodybe.service;

import org.example.yodybe.dto.ColorDto;
import org.example.yodybe.entity.Color;
import org.example.yodybe.form.ColorForm;
import org.example.yodybe.utils.BaseResponse;

import java.util.List;

public interface ColorService {
    BaseResponse getAllColors();

    BaseResponse getColorById(Long id);

    BaseResponse saveColor(ColorForm color);

    BaseResponse deleteColor(List<Long> ids);

    BaseResponse updateColor(ColorForm clColorForm);

    ColorDto createColorDto(Color color);

    Color mapToEntity(ColorForm colorForm);
}
