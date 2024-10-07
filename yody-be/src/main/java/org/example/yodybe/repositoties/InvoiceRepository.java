package org.example.yodybe.repositoties;

import org.example.yodybe.entity.Invoice;
import org.example.yodybe.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface InvoiceRepository extends JpaRepository<Invoice, Long> {
    Page<Invoice> findByUser(User user, Pageable pageable);
}
