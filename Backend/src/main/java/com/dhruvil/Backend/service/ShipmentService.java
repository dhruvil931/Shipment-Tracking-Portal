package com.dhruvil.Backend.service;

import com.dhruvil.Backend.dto.CreateShipmentRequestDto;
import com.dhruvil.Backend.entity.Shipment;
import com.dhruvil.Backend.entity.User;
import com.dhruvil.Backend.repository.ShipmentRepository;
import com.dhruvil.Backend.repository.UserRepository;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ShipmentService {

    private final UserRepository userRepository;
    private final ShipmentRepository shipmentRepository;

    public Shipment createShipment(@Valid CreateShipmentRequestDto dto, String email) {
        User user = userRepository.findByEmail(email).orElseThrow(() -> new RuntimeException("User not found"));

        if(!user.getRole().name().equals("SHIPPER")) {
            throw new RuntimeException("Only shippers can create shipments");
        }

        Shipment shipment = Shipment.builder()
                .origin(dto.getOrigin())
                .destination(dto.getDestination())
                .weight(dto.getWeight())
                .length(dto.getLength())
                .width(dto.getWidth())
                .height(dto.getHeight())
                .status("OPEN")
                .user(user)
                .build();

        return shipmentRepository.save(shipment);
    }

    public List<Shipment> getMyShipmentByUser(String email) {
        User user = userRepository.findByEmail(email).orElseThrow(() -> new RuntimeException("User not found"));
        return shipmentRepository.findByUserId(user.getId());
    }
}
