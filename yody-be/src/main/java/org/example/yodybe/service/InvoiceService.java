package org.example.yodybe.service;

import org.example.yodybe.dto.MonthlyTotalDTO;
import org.example.yodybe.dto.TopCustomerDto;
import org.example.yodybe.entity.InvoiceStatus;
import org.example.yodybe.form.InvoiceForm;
import org.example.yodybe.utils.BaseResponse;
import org.example.yodybe.utils.PaginationResponse;

import java.util.List;

public interface InvoiceService {
    PaginationResponse getAllInvoice(Integer page, Integer size);
    public PaginationResponse getInvoiceShipper(int page, int limit, Long shipperId, InvoiceStatus status, String customerName);

    PaginationResponse getByUser(Integer page, Integer size, Long userId);

    BaseResponse save(InvoiceForm invoiceForm);

    BaseResponse getInvoice(Long id);

    BaseResponse transfer(Long id, Long userId, InvoiceStatus status);

    List<MonthlyTotalDTO> getTotalAmountByMonth();
    List<TopCustomerDto> getTopCustomers();
}
