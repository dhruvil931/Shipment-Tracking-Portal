package com.dhruvil.Backend.repository;

import com.dhruvil.Backend.entity.Shipment;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ShipmentRepository extends JpaRepository<Shipment, Long> {
    List<Shipment> findByUserId(Long userId);

    List<Shipment> findByStatus(String status);
}
