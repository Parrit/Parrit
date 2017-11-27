package com.parrit.DTOs;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

public class PersonDTO {

    private long id;

    @NotNull(message = "Hey! This name needs to be between 1 and 32 characters.")
    @Size(min = 1, max = 32, message = "Hey! This name needs to be between 1 and 32 characters.")
    private String name;

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof PersonDTO)) return false;

        PersonDTO personDTO = (PersonDTO) o;

        if (getId() != personDTO.getId()) return false;
        return getName() != null ? getName().equals(personDTO.getName()) : personDTO.getName() == null;
    }

}
