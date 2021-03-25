package com.parrit.DTOs;

import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

@Getter
@Setter
@EqualsAndHashCode
public class NewProjectDTO {

    @NotNull(message = "Uh oh. Your project name must be between 1 and 32 characters.")
    @Size(min = 1, max = 32, message = "Uh oh. Your project name must be between 1 and 32 characters.")
    private String name;

    @NotNull(message = "Keeaa!? Protect yourself with a password!")
    @Size(min = 1, message = "Keeaa!? Protect yourself with a password!")
    private String password;

}
