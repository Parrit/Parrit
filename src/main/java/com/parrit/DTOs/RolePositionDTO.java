package com.parrit.DTOs;

import javax.validation.constraints.NotNull;
import java.util.Objects;

public class RolePositionDTO {

    @NotNull(message = "Where are you trying to go? Roles must be with a pairing board!")
    private Long pairingBoardId;

    public Long getPairingBoardId() {
        return pairingBoardId;
    }

    public void setPairingBoardId(Long pairingBoardId) {
        this.pairingBoardId = pairingBoardId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof RolePositionDTO)) return false;

        RolePositionDTO that = (RolePositionDTO) o;

        return Objects.equals(getPairingBoardId(), that.getPairingBoardId());
    }

}
