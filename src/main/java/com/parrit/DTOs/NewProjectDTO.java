package com.parrit.DTOs;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

public class NewProjectDTO {

    @NotNull(message = "Uh oh. Your project name must be between 1 and 32 characters.")
    @Size(min = 1, max = 32, message = "Uh oh. Your project name must be between 1 and 32 characters.")
    private String name;

    @NotNull(message = "Keeaa!? Protect yourself with a password!")
    @Size(min = 1, message = "Keeaa!? Protect yourself with a password!")
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
        if (!(o instanceof NewProjectDTO)) return false;

        NewProjectDTO that = (NewProjectDTO) o;

        if (getName() != null ? !getName().equals(that.getName()) : that.getName() != null) return false;
        return getPassword() != null ? getPassword().equals(that.getPassword()) : that.getPassword() == null;
    }

}
