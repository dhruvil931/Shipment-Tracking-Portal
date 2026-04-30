package com.dhruvil.Backend.controller;

import com.dhruvil.Backend.dto.BidWithCarrierDto;
import com.dhruvil.Backend.dto.CreateShipmentRequestDto;
import com.dhruvil.Backend.entity.Bid;
import com.dhruvil.Backend.entity.CarrierProfile;
import com.dhruvil.Backend.entity.Shipment;
import com.dhruvil.Backend.entity.type.BidStatus;
import com.dhruvil.Backend.repository.BidRepository;
import com.dhruvil.Backend.repository.CarrierRepository;
import com.dhruvil.Backend.repository.ShipmentRepository;
import com.dhruvil.Backend.service.ShipmentService;
import jakarta.transaction.Transactional;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/shipper")
@RequiredArgsConstructor
public class ShipperController {

    private final ShipmentService shipmentService;
    private final BidRepository bidRepository;
    private final CarrierRepository carrierRepository;
    private final ShipmentRepository shipmentRepository;

    @PostMapping("/create-shipment")
    public ResponseEntity<?> createShipment(
            @Valid @RequestBody CreateShipmentRequestDto dto,
            Authentication authentication) {
        String email = authentication.getName();
        Shipment shipment = shipmentService.createShipment(dto, email);
        return ResponseEntity.ok(shipment);
    }

    @GetMapping("/my-shipments")
    public ResponseEntity<?> getMyShipments(Authentication authentication) {
        String email = authentication.getName();
        return ResponseEntity.ok(shipmentService.getMyShipmentByUser(email));
    }

    @GetMapping("/bids/{shipmentId}")
    public ResponseEntity<?> getBids(@PathVariable Long shipmentId) {
        List<Bid> bids = bidRepository.findByShipmentId(shipmentId);

        List<BidWithCarrierDto> result = bids.stream().map(bid -> {
            CarrierProfile carrier = carrierRepository
                    .findById(bid.getCarrierId())
                    .orElse(null);
            return new BidWithCarrierDto(bid, carrier);
        }).toList();

        return ResponseEntity.ok(result);
    }

    @Transactional
    @PostMapping("/bids/accept/{bidId}")
    public ResponseEntity<?> acceptBid(@PathVariable Long bidId) {

        Bid bid = bidRepository.findById(bidId)
                .orElseThrow(() -> new RuntimeException("Bid not found: " + bidId));

        Shipment shipment = shipmentRepository.findById(bid.getShipmentId())
                .orElseThrow(() -> new RuntimeException("Shipment not found: " + bid.getShipmentId()));

        if ("IN_TRANSIT".equals(shipment.getStatus())) {
            return ResponseEntity.badRequest().body("Shipment already accepted");
        }

        // Update shipment first
        shipment.setAssignedCarrierId(bid.getCarrierId());
        shipment.setStatus("IN_TRANSIT");
        shipmentRepository.save(shipment);

        // Accept this bid
        bid.setStatus(BidStatus.ACCEPTED);
        bidRepository.save(bid);

        // Reject all other bids
        bidRepository.rejectOtherBids(bid.getShipmentId(), bidId);

        return ResponseEntity.ok("Accepted");
    }

    @Transactional
    @PostMapping("/complete/{shipmentId}")
    public ResponseEntity<?> completeShipment(
            @PathVariable Long shipmentId,
            Authentication authentication) {

        Shipment s = shipmentRepository.findById(shipmentId)
                .orElseThrow(() -> new RuntimeException("Shipment not found"));

        // Accept both OPEN and IN_TRANSIT just in case DB is inconsistent
        if ("DELIVERED".equals(s.getStatus())) {
            return ResponseEntity.badRequest().body("Already delivered");
        }

        s.setStatus("DELIVERED");
        s.setArchived(true);
        shipmentRepository.save(s);

        return ResponseEntity.ok("Shipment marked as delivered");
    }
}