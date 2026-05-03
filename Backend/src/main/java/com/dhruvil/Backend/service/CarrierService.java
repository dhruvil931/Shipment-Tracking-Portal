package com.dhruvil.Backend.service;

import com.dhruvil.Backend.dto.CarrierProfileView;
import com.dhruvil.Backend.repository.CarrierRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CarrierService {
    private final CarrierRepository repo;

    public CarrierProfileView getProfile(Long userId) {
        return repo.getProfileByUserId(userId);
    }
}
