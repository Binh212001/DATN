package org.example.yodybe.service;

import jakarta.persistence.EntityNotFoundException;
import org.example.yodybe.dto.InvoiceDto;
import org.example.yodybe.dto.MonthlyTotalDTO;
import org.example.yodybe.dto.ProductDto;
import org.example.yodybe.dto.TopCustomerDto;
import org.example.yodybe.entity.*;
import org.example.yodybe.form.InvoiceForm;
import org.example.yodybe.repositoties.CartRepository;
import org.example.yodybe.repositoties.InvoiceRepository;
import org.example.yodybe.repositoties.ProductRepository;
import org.example.yodybe.repositoties.UserRepository;
import org.example.yodybe.utils.BaseResponse;
import org.example.yodybe.utils.PaginationResponse;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class InvoiceServiceImpl implements InvoiceService {
    @Autowired
    private InvoiceRepository invoiceRepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    CartRepository cartRepository;
    @Autowired
    private ProductRepository productRepository;

    @Override
    public PaginationResponse getAllInvoice(Integer page, Integer size) {
        try {
            Page<Invoice> invoices = invoiceRepository.findAll(PageRequest.of(page, size));
            return paginationResponseHandler(invoices);
        } catch (Exception e) {
            return new PaginationResponse("Error getting product list", null, 500, 0, 0, 0);
        }
    }

    public PaginationResponse getInvoiceShipper(int page, int limit, Long shipperId, InvoiceStatus status, String customerName) {
        Pageable pageable = PageRequest.of(page, limit);
        Specification<Invoice> spec = Specification.where(InvoiceSpecification.hasShipperId(shipperId))
                .and(InvoiceSpecification.hasStatus(status));
        if (customerName != null) {
            spec = spec.and(InvoiceSpecification.hasCustomerName(customerName));
        }
        return paginationResponseHandler(invoiceRepository.findAll(spec, pageable));
    }

    @Override
    public PaginationResponse getByUser(Integer page, Integer size, Long userId) {

        User user = userRepository.findById(userId).orElse(null);
        if (user == null) {
            return new PaginationResponse("User not found", null, 404, 0, 0, 0);
        }
        Page<Invoice> invoices = invoiceRepository.findByUser(user, PageRequest.of(page, size));
        return paginationResponseHandler(invoices);
    }

    @Override
    public BaseResponse save(InvoiceForm invoiceForm) {
        try {
            User user = userRepository.findById(invoiceForm.getUserId()).orElseThrow(
                    () -> new RuntimeException("User not found")
            );
            List<Cart> carts = cartRepository.findAllById(invoiceForm.getCartId());
            if (carts.isEmpty()) {
                return new BaseResponse("Cart not found", null, 404);
            }
            Invoice inv = new Invoice();
            inv.setUser(user);
            inv.setTotalAmount(invoiceForm.getTotalAmount());
            inv.setInvoiceItems(carts);
            inv.setDistrict(invoiceForm.getDistrict());
            inv.setDistrictName(invoiceForm.getDistrictName());
            inv.setReceiver(invoiceForm.getReceiver());
            inv.setAddress(invoiceForm.getAddress());
            inv.setProvince(invoiceForm.getProvince());
            inv.setProvinceName(invoiceForm.getProvinceName());
            inv.setPhone(invoiceForm.getPhone());
            Invoice res = invoiceRepository.save(inv);
            return new BaseResponse("Lưu thành công", res, 200);
        } catch (Exception e) {
            return new BaseResponse("Lưu thất bại", true, 500);
        }
    }

    @Override
    public BaseResponse getInvoice(Long id) {
        try {
            Invoice invoice = invoiceRepository.findById(id).orElseThrow(
                    () -> new RuntimeException("Invoice not found")
            );
            return new BaseResponse("Invoice fetched successfully", mapToDto(invoice), 200);

        } catch (Exception e) {
            return new BaseResponse("Error getting product", null, 500);
        }
    }

    @Override
    public BaseResponse transfer(Long id, Long userId, InvoiceStatus status) {
        Optional<Invoice> invoice = invoiceRepository.findById(id);
        if (!invoice.isPresent()) {
            return new BaseResponse("Invoice not found", null, 404);
        }
        Optional<User> ship = userRepository.findById(userId);
        if (!ship.isPresent()) {
            return new BaseResponse("User not found", null, 404);
        }
        invoice.get().setShipper(ship.get());

        for (Cart c : invoice.get().getInvoiceItems()) {
                Optional<Product> p = productRepository.findById(c.getProduct().getId());
                if (p.isPresent()) {
                    p.get().setSold(p.get().getQuantity() + c.getQuantity());
                    productRepository.save(p.get());
                }
        }
        invoice.get().setStatus(status);
        invoiceRepository.save(invoice.get());
        return new BaseResponse("Invoice transfered successfully", mapToDto(invoice.get()), 200);
    }

    @Override
    public List<MonthlyTotalDTO> getTotalAmountByMonth() {
        List<Object[]> results = invoiceRepository.getTotalAmountByMonth();
        return results.stream()
                .map(row -> new MonthlyTotalDTO((Integer) row[0], (Integer) row[1], (Double) row[2]))
                .collect(Collectors.toList());
    }

    private PaginationResponse paginationResponseHandler(Page<Invoice> invoices) {
        List<InvoiceDto> dto = invoices.getContent().stream().map(this::mapToDto).toList();
        int currentPage = invoices.getPageable().getPageNumber();
        int totalPages = invoices.getTotalPages();
        long totalElements = invoices.getTotalElements();
        return new PaginationResponse("Product list fetched successfully", dto, 200, currentPage, totalPages, totalElements);
    }

    public InvoiceDto mapToDto(Invoice invoice) {
        InvoiceDto invoiceDto = new InvoiceDto();
        invoiceDto.setId(invoice.getId());
        invoiceDto.setTotalAmount(invoice.getTotalAmount());
        invoiceDto.setUser(invoice.getUser());
        invoiceDto.setInvoiceItems(invoice.getInvoiceItems());
        invoiceDto.setPayment(invoice.getPayment());
        invoiceDto.setStatus(invoice.getStatus());
        invoiceDto.setCreatedDate(invoice.getCreatedDate());
        invoiceDto.setShipper(invoice.getShipper());
        invoiceDto.setReceiver(invoice.getReceiver());
        invoiceDto.setReceiverPhone(invoice.getReceiverPhone());
        invoiceDto.setProvince(invoice.getProvince());
        invoiceDto.setDistrict(invoice.getDistrict());
        invoiceDto.setAddress(invoice.getAddress());
        invoiceDto.setDistrictName(invoice.getDistrictName());
        invoiceDto.setProvinceName(invoice.getProvinceName());
        invoiceDto.setPhone(invoice.getPhone());
        return invoiceDto;
    }

    public List<TopCustomerDto> getTopCustomers() {
        return invoiceRepository.findTopCustomers();
    }

    @Override
    public Boolean deleteInvoices(List<Long> ids) {
        try {
            invoiceRepository.deleteAllById(ids);
            return true;
        } catch (Exception e) {
            return false;
        }
    }

    @Override
    public InvoiceDto updateInvoiceDetails(Long id, InvoiceDto updatedDetails) {
        Invoice invoice = invoiceRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Invoice not found with ID: " + id));

        invoice.setReceiver(updatedDetails.getReceiver());
        invoice.setProvince(updatedDetails.getProvince());
        invoice.setProvinceName(updatedDetails.getProvinceName());
        invoice.setDistrict(updatedDetails.getDistrict());
        invoice.setDistrictName(updatedDetails.getDistrictName());
        invoice.setAddress(updatedDetails.getAddress());
        invoice.setPhone(updatedDetails.getPhone());

        invoice = invoiceRepository.save(invoice);

        InvoiceDto invoiceDto = new InvoiceDto();
        BeanUtils.copyProperties(invoice, invoiceDto);
        return invoiceDto;
    }

    @Override
    public List<Invoice> filterInvoices(String receiver, InvoiceStatus status) {
        if (receiver != null && !receiver.isEmpty() && status != null) {
            return invoiceRepository.findByReceiverAndStatus(receiver, status);
        }
        else if (receiver != null && !receiver.isEmpty()) {
            return invoiceRepository.findByReceiver(receiver);
        }
        else if (status != null) {
            return invoiceRepository.findByStatus(status);
        }
        else {
            return invoiceRepository.findAll();
        }
    }
}
