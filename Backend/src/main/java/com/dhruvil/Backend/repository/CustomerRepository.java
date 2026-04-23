package com.dhruvil.Backend.repository;

import com.dhruvil.Backend.entity.CustomerProfile;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CustomerRepository extends JpaRepository<CustomerProfile, Long> {
}
