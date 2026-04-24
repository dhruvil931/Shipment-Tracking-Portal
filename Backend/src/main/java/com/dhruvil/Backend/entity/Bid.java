package com.dhruvil.Backend.entity;

import com.dhruvil.Backend.entity.type.BidStatus;
import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(
        uniqueConstraints = @UniqueConstraint(columnNames = {"shipmentId", "carrierId"})
)
@Data
public class Bid {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long shipmentId;
    private Long carrierId;
    private Double amount;

    @Enumerated(EnumType.STRING)
    private BidStatus status;
}
