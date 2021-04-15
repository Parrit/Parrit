package com.parrit.DTOs;

import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@EqualsAndHashCode
public class PairingHistoryDTO {

    private String pairingBoardName;

    private List<PersonDTO> people;

    private String pairingTime;
}
