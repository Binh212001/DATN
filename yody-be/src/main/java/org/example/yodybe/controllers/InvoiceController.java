package org.example.yodybe.controllers;
import org.example.yodybe.dto.InvoiceDto;
import org.example.yodybe.dto.MonthlyTotalDTO;
import org.example.yodybe.dto.TopCustomerDto;
import org.example.yodybe.entity.Invoice;
import org.example.yodybe.entity.InvoiceStatus;
import org.example.yodybe.form.CartForm;
import org.example.yodybe.form.InvoiceForm;
import org.example.yodybe.service.InvoiceService;
import org.example.yodybe.utils.BaseResponse;
import org.example.yodybe.utils.PaginationResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/invoices")
public class InvoiceController {
    @Autowired
    InvoiceService invoiceService;
    @GetMapping
    public ResponseEntity<PaginationResponse> getAllInvoice(
            @RequestParam(value = "page", defaultValue = "0") Integer page,
            @RequestParam(value = "size", defaultValue = "20") Integer size
    ) {
        PaginationResponse paginationResponse = invoiceService.getAllInvoice(page, size );
        return ResponseEntity.ok(paginationResponse);
    }
    @GetMapping("/ship")
    public ResponseEntity<PaginationResponse> getAllInvoice(
            @RequestParam(value = "page", defaultValue = "0") Integer page,
            @RequestParam(value = "limit", defaultValue = "20") Integer limit,
            @RequestParam(required = false) Long shipperId,
            @RequestParam(required = false) InvoiceStatus status,
            @RequestParam(required = false) String customerName

    ) {
        PaginationResponse paginationResponse = invoiceService.getInvoiceShipper (page,limit, shipperId, status, customerName);
        return ResponseEntity.ok(paginationResponse);
    }
    @GetMapping("/user")
    public ResponseEntity<PaginationResponse> getById(
            @RequestParam(value = "page", defaultValue = "0") Integer page,
            @RequestParam(value = "size", defaultValue = "20") Integer size,
            @RequestParam Long userId
    ) {
        PaginationResponse paginationResponse = invoiceService.getByUser(page, size , userId);
        return ResponseEntity.ok(paginationResponse);
    }

    @GetMapping("/invoice")
    public ResponseEntity<BaseResponse> getInvoice(
            @RequestParam Long id
    ) {
        BaseResponse baseResponse = invoiceService.getInvoice(id);
        return ResponseEntity.ok(baseResponse);
    }

    @PutMapping("/invoice/{id}/transfer/{userId}/status/{status}")
    public ResponseEntity<BaseResponse> transfer(
            @PathVariable Long id,
            @PathVariable Long userId,
            @PathVariable InvoiceStatus status
            ) {
        BaseResponse baseResponse = invoiceService.transfer(id, userId, status);
        return ResponseEntity.ok(baseResponse);
    }

    @PostMapping
    public ResponseEntity<BaseResponse> createInvoice(@RequestBody InvoiceForm invoiceForm) {
        return ResponseEntity.ok(invoiceService.save(invoiceForm));
    }

    @GetMapping("/totals-by-month")
    public ResponseEntity<List<MonthlyTotalDTO>> getTotalsByMonth() {
        List<MonthlyTotalDTO> totals = invoiceService.getTotalAmountByMonth();
        return ResponseEntity.ok(totals);
    }

    @DeleteMapping
    public ResponseEntity<BaseResponse> deleteInvoices(@RequestBody List<Long> ids) {
        Boolean deleted  = invoiceService.deleteInvoices(ids);
        return ResponseEntity.ok(new BaseResponse("Invoices deleted successfully", deleted , 200));
    }

    @GetMapping("/top-customers")
    public ResponseEntity<List<TopCustomerDto>> getTopCustomers() {
        List<TopCustomerDto> topCustomers = invoiceService.getTopCustomers();
        return ResponseEntity.ok(topCustomers);
    }

    @PutMapping("/{id}")
    public ResponseEntity<BaseResponse> updateInvoiceDetails(
            @PathVariable Long id,
            @RequestBody InvoiceDto updatedDetails) {
        InvoiceDto updatedInvoice = invoiceService.updateInvoiceDetails(id, updatedDetails);
        return ResponseEntity.ok(new BaseResponse("Invoice updated successfully", updatedInvoice, 200));
    }
    @GetMapping("/filter")
    public ResponseEntity<BaseResponse> getFilteredInvoices(
            @RequestParam(required = false) String receiver,
            @RequestParam(required = false) InvoiceStatus status) {
        try {
            List<Invoice> filteredInvoices = invoiceService.filterInvoices(receiver, status);
            return ResponseEntity.ok(new BaseResponse("Invoices fetched successfully", filteredInvoices, 200));
        } catch (Exception e) {
            return ResponseEntity.status(500).body(new BaseResponse("Internal server error", null, 500));
        }
    }

    @PostMapping("/auto-share-invoice")
    public ResponseEntity<BaseResponse> autoShareInvoice() {
        return ResponseEntity.ok(invoiceService.autoShare());
    }
}
