package com.parrit.DTOs;

import java.util.List;

public class PairingBoardDTO {

    private long id;
    private List<PersonDTO> people;
    private boolean exempt;
    private String name;

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public List<PersonDTO> getPeople() {
        return people;
    }

    public void setPeople(List<PersonDTO> people) {
        this.people = people;
    }

    public boolean isExempt() {
        return exempt;
    }

    public void setExempt(boolean exempt) {
        this.exempt = exempt;
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
        if (!(o instanceof PairingBoardDTO)) return false;

        PairingBoardDTO that = (PairingBoardDTO) o;

        if (getId() != that.getId()) return false;
        if (isExempt() != that.isExempt()) return false;
        if (getPeople() != null ? !getPeople().equals(that.getPeople()) : that.getPeople() != null) return false;
        return getName() != null ? getName().equals(that.getName()) : that.getName() == null;
    }

}
