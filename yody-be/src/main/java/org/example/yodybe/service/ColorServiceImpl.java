package org.example.yodybe.service;

import org.example.yodybe.dto.ColorDto;
import org.example.yodybe.entity.Color;
import org.example.yodybe.form.ColorForm;
import org.example.yodybe.repositoties.ColorRepository;
import org.example.yodybe.utils.BaseResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class ColorServiceImpl implements ColorService {
    @Autowired
    private ColorRepository colorRepository;

    @Override
    public BaseResponse getAllColors() {
        try {
            List<Color> colors = colorRepository.findAll();
            List<ColorDto> colorDtos = colors.stream().map(this::createColorDto).collect(Collectors.toList());
            return new BaseResponse("Thành công", colorDtos, 200);
        } catch (Exception e) {
            return new BaseResponse("Thất bại", true, 400);
        }
    }

    @Override
    public BaseResponse getColorById(Long id) {
        try {
            ColorDto clDto = createColorDto(colorRepository.findById(id).get());
            return new BaseResponse("Thành công", clDto, 200);
        } catch (Exception e) {
            return new BaseResponse("Thất bại", true, 400);
        }
    }

    @Override
    public BaseResponse saveColor(ColorForm color) {
        try {
            Color entity = mapToEntity(color);
            colorRepository.save(entity);
            return new BaseResponse("Lưu thành công", true, 200);
        } catch (Exception e) {
            return new BaseResponse("Lưu thất bại", true, 400);
        }
    }

    @Override
    public BaseResponse deleteColor(Long id) {
        try {
            colorRepository.deleteById(id);
            return new BaseResponse("Xóa thành công", true, 200);
        } catch (Exception e) {
            return new BaseResponse("Xóa thất bại", true, 200);
        }
    }

    @Override
    public BaseResponse updateColor(Long id, ColorForm clColorForm) {
        try {
            Optional<Color> color = colorRepository.findById(id);
            if (color.isEmpty()) {
                return new BaseResponse("Không tìm thấy màu " + clColorForm.getName(), false, 4000);
            }
            color.get().setName(clColorForm.getName());
            return new BaseResponse("Cập nhật thành công", true, 200);
        } catch (Exception e) {
            return new BaseResponse("Cập nhật thất bại ", true, 200);
        }
    }

    @Override
    public ColorDto createColorDto(Color color) {
        return ColorDto.builder()
                .id(color.getId())
                .name(color.getName())
                .cssClass(color.getCssClass())
                .build();
    }

    @Override
    public Color mapToEntity(ColorForm colorForm) {
        return Color.builder()
                .name(colorForm.getName())
                .cssClass(colorForm.getCssClass())
                .build();
    }
}
