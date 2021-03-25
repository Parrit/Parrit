package com.parrit.DTOs;

import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

@Getter
@Setter
@EqualsAndHashCode
public class ChangePasswordDTO {

    @NotNull(message = "Keeaa!? Protect yourself with a password!")
    @Size(min = 1, message = "Keeaa!? Protect yourself with a password!")
    private String password;
}
