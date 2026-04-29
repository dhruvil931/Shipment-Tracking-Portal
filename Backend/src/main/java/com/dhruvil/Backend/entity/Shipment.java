package com.dhruvil.Backend.entity;

import com.dhruvil.Backend.entity.type.BidStatus;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Shipment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String origin;
    private String destination;

    private double weight;

    private double length;
    private double width;
    private double height;

    private String status; // OPEN, IN_TRANSIT, DELIVERED

    @Column(nullable = true)
    private Double currentLat;

    @Column(nullable = true)
    private Double currentLng;

    @Column(nullable = true)
    private LocalDateTime lastUpdated;

    @Column(nullable = true)
    private Long assignedCarrierId;

    private boolean archived = false;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    @JsonIgnore
    private User user;
}
