package com.dhruvil.Backend.dto;

import com.dhruvil.Backend.entity.Bid;
import com.dhruvil.Backend.entity.CarrierProfile;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class BidWithCarrierDto {
    private Bid bid;
    private CarrierProfile carrier;
}
