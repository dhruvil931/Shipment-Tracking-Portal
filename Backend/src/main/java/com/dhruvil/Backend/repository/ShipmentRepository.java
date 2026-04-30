package com.dhruvil.Backend.repository;

import com.dhruvil.Backend.entity.Shipment;
import com.dhruvil.Backend.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ShipmentRepository extends JpaRepository<Shipment, Long> {
    List<Shipment> findByUserId(Long userId);

    List<Shipment> findByStatus(String status);

    List<Shipment> findByUserAndArchivedFalse(User user);

    List<Shipment> findByStatusAndArchivedFalse(String status);

    // Newest first (id DESC), excludes nothing — shipper sees all including delivered
    List<Shipment> findByUserOrderByIdDesc(User user);

    // Carrier marketplace — only OPEN, not archived, newest first
    List<Shipment> findByStatusAndArchivedFalseOrderByIdDesc(String status);
}
