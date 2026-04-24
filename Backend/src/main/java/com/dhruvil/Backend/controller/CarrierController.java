package com.dhruvil.Backend.controller;

import com.dhruvil.Backend.dto.BidRequest;
import com.dhruvil.Backend.entity.Bid;
import com.dhruvil.Backend.entity.User;
import com.dhruvil.Backend.entity.type.BidStatus;
import com.dhruvil.Backend.repository.BidRepository;
import com.dhruvil.Backend.repository.ShipmentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/carrier")
@RequiredArgsConstructor
public class CarrierController {

    private final ShipmentRepository shipmentRepository;
    private final BidRepository bidRepository;

    @GetMapping("/marketplace")
    public ResponseEntity<?> getOpenShipment() {
        return ResponseEntity.ok(shipmentRepository.findByStatus("OPEN"));
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

        return ResponseEntity.ok(bids);
    }
}
