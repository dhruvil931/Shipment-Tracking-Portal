package com.dhruvil.Backend.repository;

import com.dhruvil.Backend.entity.CarrierProfile;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CarrierRepository extends JpaRepository<CarrierProfile, Long> {
}
