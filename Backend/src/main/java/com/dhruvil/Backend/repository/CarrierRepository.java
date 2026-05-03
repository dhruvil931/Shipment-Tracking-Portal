package com.dhruvil.Backend.repository;

import com.dhruvil.Backend.dto.CarrierProfileView;
import com.dhruvil.Backend.entity.CarrierProfile;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface CarrierRepository extends JpaRepository<CarrierProfile, Long> {
    Optional<CarrierProfile> findByUserId(Long userId);

    @Query(value = """
        SELECT 
            cp.company_name AS companyName,
            cp.region AS city,
            cp.region AS state,
            cp.region AS country,
            'N/A' AS address,
            cp.license_number AS businessNumber
        FROM carrier_profile cp
        WHERE cp.user_id = :userId
    """, nativeQuery = true)
    CarrierProfileView getProfileByUserId(Long userId);
}
