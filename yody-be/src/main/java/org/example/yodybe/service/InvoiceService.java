package org.example.yodybe.service;

import org.example.yodybe.form.InvoiceForm;
import org.example.yodybe.utils.BaseResponse;
import org.example.yodybe.utils.PaginationResponse;

public interface InvoiceService {
    PaginationResponse getAllInvoice(Integer page, Integer size);

    PaginationResponse getByUser(Integer page, Integer size, Long userId);

    BaseResponse save(InvoiceForm invoiceForm);

    BaseResponse getInvoice(Long id);
}
