package com.parrit.DTOs;

import lombok.Builder;
import lombok.Value;

import java.util.Set;

@Builder
@Value
public class PairingArrangementDTO {
    Set<PairingHistoryDTO> pairingHistories;
    String pairingTime;
}
