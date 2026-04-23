package com.dhruvil.Backend.controller;

import com.dhruvil.Backend.dto.CreateShipmentRequestDto;
import com.dhruvil.Backend.entity.Shipment;
import com.dhruvil.Backend.service.ShipmentService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/shipper")
@RequiredArgsConstructor
public class ShipperController {

    private final ShipmentService shipmentService;

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

}
