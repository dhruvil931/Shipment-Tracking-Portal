package com.dhruvil.Backend.controller;

import com.dhruvil.Backend.dto.BidWithCarrierDto;
import com.dhruvil.Backend.dto.CreateShipmentRequestDto;
import com.dhruvil.Backend.entity.Bid;
import com.dhruvil.Backend.entity.CarrierProfile;
import com.dhruvil.Backend.entity.Shipment;
import com.dhruvil.Backend.entity.type.BidStatus;
import com.dhruvil.Backend.repository.BidRepository;
import com.dhruvil.Backend.repository.CarrierRepository;
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

    @PostMapping("/create-shipment")
    public ResponseEntity<?> createShipment(@Valid @RequestBody CreateShipmentRequestDto createShipmentRequestDto, Authentication authentication) {
        String email = authentication.getName();

        Shipment shipment = shipmentService.createShipment(createShipmentRequestDto, email);

        return ResponseEntity.ok(shipment);
    }

    @GetMapping("/my-shipments")
    public ResponseEntity<?> geyMyShipment(Authentication authentication) {
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
                .orElseThrow();

        bid.setStatus(BidStatus.ACCEPTED);
        bidRepository.save(bid);

        bidRepository.rejectOtherBids(bid.getShipmentId(), bidId);

        return ResponseEntity.ok("Accepted");
    }

}
