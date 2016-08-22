package com.parrit.DTOs;

import java.util.List;

public class PairingBoardDTO {
    private long id;
    private List<PersonDTO> people;
    private Boolean isExempt;
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

    public Boolean getExempt() { return isExempt;}

    public void setExempt(Boolean exempt) { isExempt = exempt; }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
