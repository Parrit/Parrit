package com.parrit.DTOs;

import lombok.Builder;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@EqualsAndHashCode
@Builder
public class PairingHistoryDTO {
    private String pairingBoardName;
    private List<PersonDTO> people;
}
