package org.example.yodybe.repositoties;

import org.example.yodybe.entity.Invoice;
import org.example.yodybe.entity.InvoiceStatus;
import org.example.yodybe.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface InvoiceRepository extends JpaRepository<Invoice, Long> , JpaSpecificationExecutor<Invoice> {
    Page<Invoice> findByUser(User user, Pageable pageable);

    Page<Invoice> findAllByStatusAndUserFullNameContains(InvoiceStatus invoiceStatus, String searchTerm, Pageable pageable);

    Page<Invoice> findAllByStatus(InvoiceStatus invoiceStatus, Pageable pageable);

    Page<Invoice> findAllByStatusAndUserFullNameContainsAndShipper(InvoiceStatus invoiceStatus, String searchTerm, User user, Pageable pageable);
}
