package com.parrit.DTOs;

import javax.validation.Valid;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.util.List;

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

    public boolean isExempt() {
        return exempt;
    }

    public void setExempt(boolean exempt) {
        this.exempt = exempt;
    }

    public List<PersonDTO> getPeople() {
        return people;
    }

    public void setPeople(List<PersonDTO> people) {
        this.people = people;
    }

    public List<RoleDTO> getRoles() {
        return roles;
    }

    public void setRoles(List<RoleDTO> roles) {
        this.roles = roles;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof PairingBoardDTO)) return false;

        PairingBoardDTO that = (PairingBoardDTO) o;

        if (getId() != that.getId()) return false;
        if (isExempt() != that.isExempt()) return false;
        if (getName() != null ? !getName().equals(that.getName()) : that.getName() != null) return false;
        return getPeople() != null ? getPeople().equals(that.getPeople()) : that.getPeople() == null &&
            getRoles() != null ? getRoles().equals(that.getRoles()) : that.getRoles() == null;
    }

}
