package org.example.yodybe.repositoties;

import org.example.yodybe.dto.TopCustomerDto;
import org.example.yodybe.entity.Invoice;
import org.example.yodybe.entity.InvoiceStatus;
import org.example.yodybe.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface InvoiceRepository extends JpaRepository<Invoice, Long> , JpaSpecificationExecutor<Invoice> {
    Page<Invoice> findByUser(User user, Pageable pageable);

    Page<Invoice> findAllByStatusAndUserFullNameContains(InvoiceStatus invoiceStatus, String searchTerm, Pageable pageable);

    Page<Invoice> findAllByStatus(InvoiceStatus invoiceStatus, Pageable pageable);

    Page<Invoice> findAllByStatusAndUserFullNameContainsAndShipper(InvoiceStatus invoiceStatus, String searchTerm, User user, Pageable pageable);

    @Query("SELECT MONTH(i.createdAt) AS month, YEAR(i.createdAt) AS year, SUM(i.totalAmount) AS total " +
            "FROM Invoice i " +
            "GROUP BY YEAR(i.createdAt), MONTH(i.createdAt) " +
            "ORDER BY year, month")
    List<Object[]> getTotalAmountByMonth();

    @Query("SELECT new org.example.yodybe.dto.TopCustomerDto(i.user.id, i.user.username, SUM(i.totalAmount)) " +
            "FROM Invoice i " +
            "GROUP BY i.user.id, i.user.username " +
            "ORDER BY SUM(i.totalAmount) DESC")
    List<TopCustomerDto> findTopCustomers();
}
