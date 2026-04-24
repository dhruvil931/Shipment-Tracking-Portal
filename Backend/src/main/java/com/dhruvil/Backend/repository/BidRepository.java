package com.dhruvil.Backend.repository;

import com.dhruvil.Backend.entity.Bid;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface BidRepository extends JpaRepository<Bid, Long> {
    List<Bid> findByShipmentId(Long shipmentId);

    @Modifying
    @Query("UPDATE Bid b SET b.status = 'REJECTED' WHERE b.shipmentId = :shipmentId AND b.id != :bidId")
    void rejectOtherBids(Long shipmentId, Long bidId);

    boolean existsByShipmentIdAndCarrierId(Long shipmentId, Long carrierId);

    List<Bid> findByCarrierId(Long carrierId);
}
