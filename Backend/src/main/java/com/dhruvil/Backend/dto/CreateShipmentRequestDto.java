package com.dhruvil.Backend.dto;

import jakarta.validation.constraints.*;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CreateShipmentRequestDto {

    @NotBlank
    private String origin;

    @NotBlank
    private String destination;

    @NotNull @Positive
    private Integer weight;

    @NotNull @Positive
    private Integer length;

    @NotNull @Positive
    private Integer width;

    @NotNull @Positive
    private Integer height;
}