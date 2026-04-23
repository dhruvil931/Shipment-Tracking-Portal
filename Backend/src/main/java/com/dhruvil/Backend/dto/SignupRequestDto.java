package com.dhruvil.Backend.dto;

import com.dhruvil.Backend.entity.type.Role;
import lombok.Data;

import java.util.Map;

@Data
public class SignupRequestDto {
    private String fullName;
    private String email;
    private String password;
    private Role role;

    private Map<String, Object> roleData;
}
