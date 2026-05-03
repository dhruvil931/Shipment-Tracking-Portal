package com.dhruvil.Backend.service;

import com.dhruvil.Backend.entity.CustomerProfile;
import com.dhruvil.Backend.repository.CustomerRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class CustomerService {
    private final CustomerRepository repo;

    public Map<String, Object> getProfile(Long userId) {

        Map<String, Object> row = repo.getCustomerProfile(userId);

        if (row == null) {
            throw new RuntimeException("Profile not found");
        }

        Map<String, Object> response = new HashMap<>();

        // 🔥 FIX: create nested user object
        Map<String, Object> user = new HashMap<>();
        user.put("fullName", row.get("fullName"));

        response.put("user", user);

        response.put("address", row.get("address"));
        response.put("city", row.get("city"));
        response.put("state", row.get("state"));
        response.put("country", row.get("country"));
        response.put("postalCode", row.get("postalCode"));

        return response;
    }
}
