package com.parrit.entities;

import lombok.Builder;
import lombok.Data;

import java.sql.Timestamp;
import java.util.Set;

@Builder
@Data
public class PairingArrangement {
    Set<PairingHistory> pairingHistories;
    private final Timestamp pairingTime;
    private final Project project;
}
