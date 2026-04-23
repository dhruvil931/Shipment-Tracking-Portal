package com.dhruvil.Backend.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.Data;

@Entity
@Data
public class ShipperProfile {
    @Id
    private Long userId; // Linked to User.id
    private String companyName;
    private String address;
    private String city;
    private String state;
    private String country;
    private String postalCode;
    private String businessNumber;
    private String industry;
}
