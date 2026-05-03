package com.dhruvil.Backend.repository;

import com.dhruvil.Backend.entity.CustomerProfile;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Map;
import java.util.Optional;

public interface CustomerRepository extends JpaRepository<CustomerProfile, Long> {
    Optional<CustomerProfile> findByUserId(Long userId);

    @Query(value = """
    SELECT 
        u.full_name AS fullName,
        cp.address AS address,
        cp.city AS city,
        cp.state AS state,
        cp.country AS country,
        cp.postal_code AS postalCode
    FROM customer_profile cp
    JOIN user u ON cp.user_id = u.id
    WHERE cp.user_id = :userId
""", nativeQuery = true)
    Map<String, Object> getCustomerProfile(Long userId);
}
