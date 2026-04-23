package com.dhruvil.Backend.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.Data;

import java.time.LocalDate;

@Entity
@Data
public class CarrierProfile {
    @Id
    private Long userId;
    private String companyName;
    private String vehicleType;
    private String vehicleCapacity;
    private String vehiclePlate;
    private String licenseNumber;
    private LocalDate licenseExpiry;
    private Integer experience;
    private String region;
}
