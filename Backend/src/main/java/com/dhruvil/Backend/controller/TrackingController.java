package com.dhruvil.Backend.controller;

import com.dhruvil.Backend.entity.Shipment;
import com.dhruvil.Backend.repository.ShipmentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/tracking")
@RequiredArgsConstructor
public class TrackingController {

    private final ShipmentRepository shipmentRepository;

    @GetMapping("/track/{shipmentId}")
    public ResponseEntity<?> track(@PathVariable Long shipmentId) {

        Shipment s = shipmentRepository.findById(shipmentId)
                .orElseThrow(() -> new RuntimeException("Shipment not found: " + shipmentId));

        // IMPORTANT: Map.of() throws NullPointerException if any value is null.
        // Use HashMap which accepts null values safely.
        Map<String, Object> response = new HashMap<>();
        response.put("lat",         s.getCurrentLat());
        response.put("lng",         s.getCurrentLng());
        response.put("status",      s.getStatus());
        response.put("lastUpdated", s.getLastUpdated());

        return ResponseEntity.ok(response);
    }
}