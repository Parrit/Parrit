package com.parrit.DTOs;

import java.util.List;

public class PairingHistoryDTO {

    private String pairingTime;
    private List<PersonDTO> people;
    private String pairingBoardName;

    public String getPairingTime() {
        return pairingTime;
    }

    public void setPairingTime(String pairingTime) {
        this.pairingTime = pairingTime;
    }

    public List<PersonDTO> getPeople() {
        return people;
    }

    public void setPeople(List<PersonDTO> people) {
        this.people = people;
    }

    public String getPairingBoardName() {
        return pairingBoardName;
    }

    public void setPairingBoardName(String pairingBoardName) {
        this.pairingBoardName = pairingBoardName;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof PairingHistoryDTO)) return false;

        PairingHistoryDTO that = (PairingHistoryDTO) o;

        if (getPairingTime() != null ? !getPairingTime().equals(that.getPairingTime()) : that.getPairingTime() != null) return false;
        if (getPeople() != null ? !getPeople().equals(that.getPeople()) : that.getPeople() != null) return false;
        return getPairingBoardName() != null ? getPairingBoardName().equals(that.getPairingBoardName()) : that.getPairingBoardName() == null;
    }

}
