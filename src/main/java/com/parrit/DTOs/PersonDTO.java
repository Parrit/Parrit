package com.parrit.DTOs;

import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

@Getter
@Setter
@EqualsAndHashCode
public class PersonDTO {

    private long id;

    @NotNull(message = "Hey! This name needs to be between 1 and 32 characters.")
    @Size(min = 1, max = 32, message = "Hey! This name needs to be between 1 and 32 characters.")
    private String name;

}
