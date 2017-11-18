package com.parrit.DTOs;

import java.util.List;

public class ProjectDTO {

    private long id;
    private String name;
    private List<PairingBoardDTO> pairingBoards;
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

    public List<PairingBoardDTO> getPairingBoards() {
        return pairingBoards;
    }

    public void setPairingBoards(List<PairingBoardDTO> pairingBoards) {
        this.pairingBoards = pairingBoards;
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
        if (!(o instanceof ProjectDTO)) return false;

        ProjectDTO that = (ProjectDTO) o;

        if (getId() != that.getId()) return false;
        if (getName() != null ? !getName().equals(that.getName()) : that.getName() != null) return false;
        if (getPairingBoards() != null ? !getPairingBoards().equals(that.getPairingBoards()) : that.getPairingBoards() != null) return false;
        return getPeople() != null ? getPeople().equals(that.getPeople()) : that.getPeople() == null;
    }

}
