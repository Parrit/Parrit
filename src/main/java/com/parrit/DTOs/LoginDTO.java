package com.parrit.DTOs;

import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

@Getter
@Setter
@EqualsAndHashCode
public class LoginDTO {

    @NotNull(message = "Keeaa!? That’s not your project name.")
    @Size(min = 1, message = "Keeaa!? That’s not your project name.")
    private String name;

    @NotNull(message = "Polly want a cracker? Try another password.")
    @Size(min = 1, message = "Polly want a cracker? Try another password.")
    private String password;
}
