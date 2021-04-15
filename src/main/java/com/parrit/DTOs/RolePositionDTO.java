package com.parrit.DTOs;

import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotNull;

@Getter
@Setter
@EqualsAndHashCode
public class RolePositionDTO {

    @NotNull(message = "Where are you trying to go? Roles must be with a pairing board!")
    private Long pairingBoardId;

}
