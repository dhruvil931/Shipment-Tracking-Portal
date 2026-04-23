package com.dhruvil.Backend.controller;

import com.dhruvil.Backend.dto.LoginRequestDto;
import com.dhruvil.Backend.dto.LoginResponseDto;
import com.dhruvil.Backend.dto.SignupRequestDto;
import com.dhruvil.Backend.dto.SignupResponseDto;
import com.dhruvil.Backend.repository.UserRepository;
import com.dhruvil.Backend.security.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class    AuthController {
    private final AuthService authService;
    private final UserRepository userRepository;

    @PostMapping("/login")
    public ResponseEntity<LoginResponseDto> login(@RequestBody LoginRequestDto loginRequestDto) {
        return ResponseEntity.ok(authService.login(loginRequestDto));
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody SignupRequestDto request) {
        try {
            authService.signup(request);
            return ResponseEntity.ok("User registered successfully");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/check-email")
    public boolean checkEmail(@RequestParam String email) {
        return userRepository.existsByEmail(email);
    }
}
