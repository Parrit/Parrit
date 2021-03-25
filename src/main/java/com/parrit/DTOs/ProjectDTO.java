package com.parrit.DTOs;

import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;

import com.parrit.entities.Project;

import javax.validation.Valid;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.util.List;

@Getter
@Setter
@EqualsAndHashCode
public class ProjectDTO {

    private long id;

    @NotNull
    @Size(min = 1, max = 32)
    private String name;

    @Valid
    private List<PairingBoardDTO> pairingBoards;

    @Valid
    private List<PersonDTO> people;

}
