package com.dhruvil.Backend.controller;

import com.dhruvil.Backend.entity.User;
import com.dhruvil.Backend.service.CustomerService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/customer")
@RequiredArgsConstructor
public class CustomerController {
    private final CustomerService service;

    @GetMapping("/profile")
    public ResponseEntity<?> getProfile(Authentication auth) {
        User user = (User) auth.getPrincipal();

        return ResponseEntity.ok(service.getProfile(user.getId()));
    }
}
