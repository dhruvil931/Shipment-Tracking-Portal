package com.dhruvil.Backend.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.Data;

@Entity
@Data
public class CustomerProfile {
    @Id
    private long userId;
    private String address;
    private String city;
    private String state;
    private String country;
    private Integer postalCode;
}
