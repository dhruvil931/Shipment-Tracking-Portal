package com.dhruvil.Backend.repository;

import com.dhruvil.Backend.entity.ShipperProfile;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ShipperRepository extends JpaRepository<ShipperProfile, Long> {

}
