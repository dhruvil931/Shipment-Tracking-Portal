package com.dhruvil.Backend.controller;

import com.dhruvil.Backend.repository.ShipmentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/carrier")
@RequiredArgsConstructor
public class CarrierController {

    private final ShipmentRepository shipmentRepository;

    @GetMapping("/marketplace")
    public ResponseEntity<?> getOpenShipment() {
        return ResponseEntity.ok(shipmentRepository.findByStatus("OPEN"));
    }

}
