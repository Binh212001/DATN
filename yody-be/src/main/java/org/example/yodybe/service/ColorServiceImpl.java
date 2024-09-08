package org.example.yodybe.service;

import jakarta.transaction.Transactional;
import org.example.yodybe.dto.ColorDto;
import org.example.yodybe.entity.Color;
import org.example.yodybe.entity.Product;
import org.example.yodybe.entity.Size;
import org.example.yodybe.form.ColorForm;
import org.example.yodybe.repositoties.ColorRepository;
import org.example.yodybe.repositoties.ProductRepository;
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
    @Autowired
    private ProductRepository productRepository;

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
            Color res =  colorRepository.save(entity);
            return new BaseResponse("Lưu thành công", res, 200);
        } catch (Exception e) {
            return new BaseResponse("Lưu thất bại", true, 400);
        }
    }

    @Transactional
    @Override
    public BaseResponse deleteColor(List<Long> ids) {
        try {
            for (Long id : ids) {
                Optional<Color> color = colorRepository.findById(id);
                List<Product>  products = productRepository.findByColors(color.get());
                if (!products.isEmpty()) {
                    return new BaseResponse("Không thể xóa màu ["+color.get().getName()+"] đang có sản phẩm liên quan", true, 400);
                }
                colorRepository.deleteById(id);
            }
            return new BaseResponse("Xóa thành công", true, 200);
        } catch (Exception e) {
            return new BaseResponse("Size đã được gán cho sản phẩm. Hãy xóa sản phẩm trước.", true, 200);
        }
    }

    @Override
    public BaseResponse updateColor( ColorForm clColorForm) {
        try {
            Optional<Color> color = colorRepository.findById(clColorForm.getId());
            if (color.isEmpty()) {
                return new BaseResponse("Không tìm thấy màu " + clColorForm.getName(), false, 4000);
            }
            color.get().setName(clColorForm.getName());
            colorRepository.save(color.get());
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
