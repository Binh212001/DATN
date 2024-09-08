package org.example.yodybe.service;

import jakarta.transaction.Transactional;
import org.example.yodybe.dto.SizeDto;
import org.example.yodybe.entity.Product;
import org.example.yodybe.entity.Size;
import org.example.yodybe.form.SizeForm;
import org.example.yodybe.repositoties.ProductRepository;
import org.example.yodybe.repositoties.SizeRepository;
import org.example.yodybe.utils.BaseResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class SizeServiceImpl implements SizeService {
    @Autowired
    private SizeRepository sizeRepo;
    @Autowired
    private ProductRepository productRepository;

    @Override
    public BaseResponse getAllSizes() {
        try {
            List<Size> sizes = sizeRepo.findAll();
            List<SizeDto> sizeDtos = sizes.stream().map(this::createSizeDto).collect(Collectors.toList());
            return new BaseResponse("Thành công", sizeDtos, 200);
        } catch (Exception e) {
            return new BaseResponse("Thất bại", true, 400);
        }
    }

    @Override
    public BaseResponse getSizeById(Long id) {
        try {
            SizeDto sizeDto = createSizeDto(sizeRepo.findById(id).get());
            return new BaseResponse("Thành công", sizeDto, 200);
        } catch (Exception e) {
            return new BaseResponse("Thất bại", true, 400);
        }
    }

    @Override
    public BaseResponse saveSize(SizeForm color) {
        try {
            Size entity = mapToEntity(color);
            Size res = sizeRepo.save(entity);
            return new BaseResponse("Lưu thành công", res, 200);
        } catch (Exception e) {
            return new BaseResponse("Lưu thất bại", false, 400);
        }
    }

    @Transactional
    @Override
    public BaseResponse deleteSize(List<Long> ids) {
        try {
            for (Long id : ids) {
                Optional<Size> size = sizeRepo.findById(id);
                List<Product>  products = productRepository.findBySizes(size.get());
                if (!products.isEmpty()) {
                    return new BaseResponse("Không thể xóa màu ["+size.get().getName()+"] đang có sản phẩm liên quan", true, 400);
                }
                sizeRepo.deleteById(id);
            }
            return new BaseResponse("Xóa thành công", true, 200);
        } catch (Exception e) {
            return new BaseResponse("Xóa thất bại", true, 200);
        }
    }

    @Override
    public BaseResponse updateSize(Long id, SizeForm clSizeForm) {
        try {
            Optional<Size> size = sizeRepo.findById(id);
            if (size.isEmpty()) {
                return new BaseResponse("Không tìm thấy màu " + clSizeForm.getName(), false, 4000);
            }
            size.get().setName(clSizeForm.getName());
            sizeRepo.save(size.get());
            return new BaseResponse("Cập nhật thành công", true, 200);
        } catch (Exception e) {
            return new BaseResponse("Cập nhật thất bại ", true, 200);
        }
    }

    @Override
    public SizeDto createSizeDto(Size size) {
        return SizeDto.builder()
                .id(size.getId())
                .name(size.getName())
                .build();
    }

    @Override
    public Size mapToEntity(SizeForm sizeForm) {
        return Size.builder()
                .name(sizeForm.getName())
                .build();
    }
}
