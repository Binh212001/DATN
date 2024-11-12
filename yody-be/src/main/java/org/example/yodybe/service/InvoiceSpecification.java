package org.example.yodybe.service;

import org.example.yodybe.entity.Invoice;
import org.example.yodybe.entity.InvoiceStatus;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Component;

@Component
public class InvoiceSpecification {
    public static Specification<Invoice> hasShipperId(Long shipperId) {
        return (root, query, cb) -> shipperId == null ? null : cb.equal(root.get("shipper").get("id"), shipperId);
    }
    public static Specification<Invoice> hasStatus(InvoiceStatus status) {
        return (root, query, cb) -> status == null ? null : cb.equal(root.get("status"), status);
    }

    public static Specification<Invoice> hasCustomerName(String customerName) {
        return (root, query, cb) -> customerName == null ? null : cb.like(root.get("user").get("fullName"), customerName);
    }
}