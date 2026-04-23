package com.dhruvil.Backend.security;

import com.dhruvil.Backend.dto.LoginRequestDto;
import com.dhruvil.Backend.dto.LoginResponseDto;
import com.dhruvil.Backend.dto.SignupRequestDto;
import com.dhruvil.Backend.dto.SignupResponseDto;
import com.dhruvil.Backend.entity.CarrierProfile;
import com.dhruvil.Backend.entity.CustomerProfile;
import com.dhruvil.Backend.entity.ShipperProfile;
import com.dhruvil.Backend.entity.User;
import com.dhruvil.Backend.repository.CarrierRepository;
import com.dhruvil.Backend.repository.CustomerRepository;
import com.dhruvil.Backend.repository.ShipperRepository;
import com.dhruvil.Backend.repository.UserRepository;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Map;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final AuthenticationManager authenticationManager;
    private final AuthUtil authUtil;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final ShipperRepository shipperRepository;
    private final CarrierRepository carrierRepository;
    private final CustomerRepository customerRepository;

    public LoginResponseDto login(LoginRequestDto loginRequestDto) {
        try {
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(loginRequestDto.getEmail(), loginRequestDto.getPassword())
            );

            User user = (User) authentication.getPrincipal();

            String token = authUtil.generateAccessToken(user);

            return new LoginResponseDto(token, user.getId(), user.getRole().name(), user.getFullName());
        } catch (Exception e) {
            e.printStackTrace();
            throw e;
        }
    }

    @Transactional
    public SignupResponseDto signup(SignupRequestDto signupRequestDto) {
        User user = userRepository.findByEmail(signupRequestDto.getEmail()).orElse(null);

        if(user != null) throw new IllegalArgumentException("User already exist");

        user = userRepository.save(User.builder()
                .email(signupRequestDto.getEmail())
                .password(passwordEncoder.encode(signupRequestDto.getPassword()))
                .fullName(signupRequestDto.getFullName())
                .role(signupRequestDto.getRole())
                .build()
        );

        User savedUser = userRepository.save(user);

        saveRoleProfile(savedUser, signupRequestDto.getRoleData());

        return new SignupResponseDto(user.getId(), user.getEmail());
    }

    private void saveRoleProfile(User user, Map<String, Object> roleData) {
        ObjectMapper mapper = new ObjectMapper();
        mapper.registerModule(new JavaTimeModule());

        switch (user.getRole().toString().toLowerCase()) {
            case "shipper":
                ShipperProfile shipper = mapper.convertValue(roleData, ShipperProfile.class);
                shipper.setUserId(user.getId());
                shipperRepository.save(shipper);
                break;

            case "carrier":
                CarrierProfile carrier = mapper.convertValue(roleData, CarrierProfile.class);
                carrier.setUserId(user.getId());
                carrierRepository.save(carrier);
                break;

            case "customer":
                CustomerProfile customer = mapper.convertValue(roleData, CustomerProfile.class);
                customer.setUserId(user.getId());
                customerRepository.save(customer);
                break;

            default:
                throw new IllegalArgumentException("Invalid role type");
        }
    }


}
