package com.parrit.DTOs;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

public class LoginDTO {

    @NotNull(message = "Keeaa!? That’s not your project name.")
    @Size(min = 1, message = "Keeaa!? That’s not your project name.")
    private String name;

    @NotNull(message = "Polly want a cracker? Try another password.")
    @Size(min = 1, message = "Polly want a cracker? Try another password.")
    private String password;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof LoginDTO)) return false;

        LoginDTO that = (LoginDTO) o;

        if (getName() != null ? !getName().equals(that.getName()) : that.getName() != null) return false;
        return getPassword() != null ? getPassword().equals(that.getPassword()) : that.getPassword() == null;
    }

}
