package com.parrit.DTOs;

import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;

import javax.validation.Valid;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.util.List;

@Getter
@Setter
@EqualsAndHashCode
public class PairingBoardDTO {

    private long id;

    @NotNull(message = "Hey! This name needs to be between 1 and 32 characters.")
    @Size(max = 32, message = "Hey! This name needs to be between 1 and 32 characters.")
    private String name;

    private boolean exempt;

    @Valid
    private List<PersonDTO> people;

    @Valid
    private List<RoleDTO> roles;

}
