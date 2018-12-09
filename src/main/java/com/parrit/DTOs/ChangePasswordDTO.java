package com.parrit.DTOs;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.util.Objects;

public class ChangePasswordDTO {

    @NotNull(message = "Keeaa!? Protect yourself with a password!")
    @Size(min = 1, message = "Keeaa!? Protect yourself with a password!")
    private String password;

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        ChangePasswordDTO that = (ChangePasswordDTO) o;

        return Objects.equals(password, that.password);
    }
}
