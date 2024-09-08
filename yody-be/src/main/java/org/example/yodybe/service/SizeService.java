package org.example.yodybe.service;


import org.example.yodybe.dto.SizeDto;
import org.example.yodybe.entity.Size;
import org.example.yodybe.form.SizeForm;
import org.example.yodybe.utils.BaseResponse;

import java.util.List;

public interface SizeService {
    BaseResponse getAllSizes();

    BaseResponse getSizeById(Long id);

    BaseResponse saveSize(SizeForm color);

    BaseResponse deleteSize(List<Long> ids);

    BaseResponse updateSize(Long id, SizeForm clSizeForm);

    SizeDto createSizeDto(Size color);

    Size mapToEntity(SizeForm colorForm);
}
