package com.parrit.DTOs;

import java.util.List;

public class WorkspaceDTO {
    private long id;
    private String name;
    private List<SpaceDTO> spaces;
    private List<PersonDTO> people;

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

    public List<SpaceDTO> getSpaces() {
        return spaces;
    }

    public void setSpaces(List<SpaceDTO> spaces) {
        this.spaces = spaces;
    }

    public List<PersonDTO> getPeople() {
        return people;
    }

    public void setPeople(List<PersonDTO> people) {
        this.people = people;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof WorkspaceDTO)) return false;

        WorkspaceDTO that = (WorkspaceDTO) o;

        if (getId() != that.getId()) return false;
        if (getName() != null ? !getName().equals(that.getName()) : that.getName() != null) return false;
        if (getSpaces() != null ? !getSpaces().equals(that.getSpaces()) : that.getSpaces() != null) return false;
        return getPeople() != null ? getPeople().equals(that.getPeople()) : that.getPeople() == null;

    }
}
