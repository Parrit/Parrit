package com.parrit.DTOs;

import javax.validation.constraints.AssertTrue;
import javax.validation.constraints.NotNull;
import java.util.Objects;

public class PersonPositionDTO {

    @NotNull(message = "Where are you trying to go? Floating or a pairing board?")
    private Boolean floating;

    private Long pairingBoardId;

    public Boolean isFloating() {
        return floating;
    }

    public void setFloating(Boolean floating) {
        this.floating = floating;
    }

    public Long getPairingBoardId() {
        return pairingBoardId;
    }

    public void setPairingBoardId(Long pairingBoardId) {
        this.pairingBoardId = pairingBoardId;
    }

    @AssertTrue(message = "Kwak! If your not floating, what are yea?")
    public boolean isPairingBoardId() {
        return floating != null && (floating || pairingBoardId != null);
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof PersonPositionDTO)) return false;

        PersonPositionDTO that = (PersonPositionDTO) o;

        return Objects.equals(isFloating(), that.isFloating()) &&
                Objects.equals(getPairingBoardId(), that.getPairingBoardId());
    }

}
