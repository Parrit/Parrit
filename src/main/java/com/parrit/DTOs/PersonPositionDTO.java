package com.parrit.DTOs;

import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.AssertTrue;
import javax.validation.constraints.NotNull;

@Getter
@Setter
@EqualsAndHashCode
public class PersonPositionDTO {

    @NotNull(message = "Where are you trying to go? Floating or a pairing board?")
    private boolean floating;

    private Long pairingBoardId;

    @AssertTrue(message = "Kwak! If your not floating, what are yea?")
    public boolean isPairingBoardId() {
        return floating || pairingBoardId != null;
    }

}
