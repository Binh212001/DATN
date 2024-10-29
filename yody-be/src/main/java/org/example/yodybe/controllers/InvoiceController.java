package org.example.yodybe.controllers;
import org.example.yodybe.form.CartForm;
import org.example.yodybe.form.InvoiceForm;
import org.example.yodybe.service.InvoiceService;
import org.example.yodybe.utils.BaseResponse;
import org.example.yodybe.utils.PaginationResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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
        PaginationResponse paginationResponse = invoiceService.getAllInvoice(page, size);
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

    @PostMapping
    public ResponseEntity<BaseResponse> createInvoice(@RequestBody InvoiceForm invoiceForm) {
        return ResponseEntity.ok(invoiceService.save(invoiceForm));
    }
}
