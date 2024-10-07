package org.example.yodybe.service;

import org.example.yodybe.dto.InvoiceDto;
import org.example.yodybe.dto.ProductDto;
import org.example.yodybe.entity.Cart;
import org.example.yodybe.entity.Invoice;
import org.example.yodybe.entity.Product;
import org.example.yodybe.entity.User;
import org.example.yodybe.form.InvoiceForm;
import org.example.yodybe.repositoties.CartRepository;
import org.example.yodybe.repositoties.InvoiceRepository;
import org.example.yodybe.repositoties.UserRepository;
import org.example.yodybe.utils.BaseResponse;
import org.example.yodybe.utils.PaginationResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class InvoiceServiceImpl implements InvoiceService{
    @Autowired
    private InvoiceRepository invoiceRepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    CartRepository cartRepository;

    @Override
    public PaginationResponse getAllInvoice(Integer page, Integer size) {
        try {
            Page<Invoice> invoices = invoiceRepository.findAll(PageRequest.of(page, size));
            return paginationResponseHandler(invoices);
        } catch (Exception e) {
            return new PaginationResponse("Error getting product list", null, 500, 0, 0, 0);
        }
    }

    @Override
    public PaginationResponse getByUser(Integer page, Integer size, Long userId) {

        User user = userRepository.findById(userId).orElse(null);
        if(user == null) {
            return new PaginationResponse("User not found", null, 404, 0, 0, 0);
        }
        Page<Invoice> invoices = invoiceRepository.findByUser(user, PageRequest.of(page, size));
        return paginationResponseHandler(invoices);
    }

    @Override
    public BaseResponse save(InvoiceForm invoiceForm) {
        try {
            User  user = userRepository.findById(invoiceForm.getUserId()).orElseThrow(
                    () -> new RuntimeException("User not found")
            );
            List<Cart> carts = cartRepository.findAllById(invoiceForm.getCartId());
            if(carts.isEmpty()) {
                return new BaseResponse("Cart not found", null, 404);
            }
            Invoice inv = new Invoice();
            inv.setUser(user);
            inv.setTotalAmount(invoiceForm.getTotalAmount());
            inv.setInvoiceItems(carts);
            Invoice res = invoiceRepository.save(inv);
            return new BaseResponse("Lưu thành công", res, 200);
        } catch (Exception e) {
            return new BaseResponse("Lưu thất bại", true, 400);
        }
    }

    private PaginationResponse paginationResponseHandler(Page<Invoice> invoices) {
        List<InvoiceDto> dto = invoices.getContent().stream().map(this::mapToDto).toList();
        int currentPage = invoices.getPageable().getPageNumber();
        int totalPages = invoices.getTotalPages();
        long totalElements = invoices.getTotalElements();
        return new PaginationResponse("Product list fetched successfully", dto, 200, currentPage, totalPages, totalElements);
    }

    public  InvoiceDto mapToDto(Invoice invoice) {
        InvoiceDto invoiceDto = new InvoiceDto();
        invoiceDto.setId(invoice.getId());
        invoiceDto.setTotalAmount(invoice.getTotalAmount());
        invoiceDto.setUser(invoice.getUser());
        invoiceDto.setInvoiceItems(invoice.getInvoiceItems());
        return invoiceDto;
    }

}
