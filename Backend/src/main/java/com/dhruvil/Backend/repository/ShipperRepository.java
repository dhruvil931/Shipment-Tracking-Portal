package com.dhruvil.Backend.repository;

import com.dhruvil.Backend.entity.ShipperProfile;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ShipperRepository extends JpaRepository<ShipperProfile, Long> {
    Optional<ShipperProfile> findByUserId(Long userId);
}
