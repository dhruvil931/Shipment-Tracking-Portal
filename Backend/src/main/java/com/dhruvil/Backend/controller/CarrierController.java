package com.dhruvil.Backend.controller;

import com.dhruvil.Backend.dto.BidRequest;
import com.dhruvil.Backend.entity.Bid;
import com.dhruvil.Backend.entity.Shipment;
import com.dhruvil.Backend.entity.User;
import com.dhruvil.Backend.entity.type.BidStatus;
import com.dhruvil.Backend.repository.BidRepository;
import com.dhruvil.Backend.repository.ShipmentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/carrier")
@RequiredArgsConstructor
public class CarrierController {

    private final ShipmentRepository shipmentRepository;
    private final BidRepository bidRepository;

    @GetMapping("/marketplace")
    public ResponseEntity<?> getOpenShipment() {
        return ResponseEntity.ok(
                shipmentRepository.findByStatusAndArchivedFalseOrderByIdDesc("OPEN")
        );
    }

    @PostMapping("/bids/submit/{shipmentId}")
    public ResponseEntity<?> submitBid(@PathVariable Long shipmentId, @RequestBody BidRequest request, Authentication authentication) {
        if (request.getAmount() == null || request.getAmount() <= 0) {
            return ResponseEntity.badRequest().body("Invalid amount");
        }

        User user = (User) authentication.getPrincipal();
        Long carrierId = user.getId();

        Bid bid = new Bid();
        bid.setShipmentId(shipmentId);
        bid.setCarrierId(carrierId);
        bid.setAmount(request.getAmount());
        bid.setStatus(BidStatus.PENDING);

        try {
            bidRepository.save(bid);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("You already placed a bid");
        }

        return ResponseEntity.ok("Bid stored successfully");
    }

    @GetMapping("/my-bids")
    public ResponseEntity<?> getMyBids(Authentication authentication) {
        User user = (User) authentication.getPrincipal();
        Long carrierId = user.getId();

        List<Bid> bids = bidRepository.findByCarrierId(carrierId);

        // Filter out bids for archived/delivered shipments
        List<Bid> activeBids = bids.stream().filter(bid -> {
            return shipmentRepository.findById(bid.getShipmentId())
                    .map(s -> !s.isArchived())
                    .orElse(false);
        }).collect(java.util.stream.Collectors.toList());

        return ResponseEntity.ok(activeBids);
    }

    @PostMapping("/update-location/{shipmentId}")
    public ResponseEntity<?> updateLocation(
            @PathVariable Long shipmentId,
            @RequestBody Map<String, Double> body,
            Authentication authentication
    ) {
        Shipment s = shipmentRepository.findById(shipmentId)
                .orElseThrow(() -> new RuntimeException("Shipment not found"));

        User user = (User) authentication.getPrincipal();

        if (!"IN_TRANSIT".equals(s.getStatus())) {
            return ResponseEntity.badRequest().body("Shipment not active");
        }

        // Null-safe ownership check
        if (s.getAssignedCarrierId() == null || !s.getAssignedCarrierId().equals(user.getId())) {
            return ResponseEntity.status(403).body("Not your shipment");
        }

        Double lat = body.get("lat");
        Double lng = body.get("lng");

        if (lat == null || lng == null) {
            return ResponseEntity.badRequest().body("Invalid coordinates");
        }

        s.setCurrentLat(lat);
        s.setCurrentLng(lng);
        s.setLastUpdated(LocalDateTime.now());
        shipmentRepository.save(s);

        return ResponseEntity.ok("Updated");
    }
}
