package com.parrit.DTOs;

import java.util.List;

public class PairingHistoryDTO {

    private String pairingBoardName;

    private List<PersonDTO> people;

    private String pairingTime;

    public String getPairingBoardName() {
        return pairingBoardName;
    }

    public void setPairingBoardName(String pairingBoardName) {
        this.pairingBoardName = pairingBoardName;
    }

    public List<PersonDTO> getPeople() {
        return people;
    }

    public void setPeople(List<PersonDTO> people) {
        this.people = people;
    }

    public String getPairingTime() {
        return pairingTime;
    }

    public void setPairingTime(String pairingTime) {
        this.pairingTime = pairingTime;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof PairingHistoryDTO)) return false;

        PairingHistoryDTO that = (PairingHistoryDTO) o;

        if (getPairingBoardName() != null ? !getPairingBoardName().equals(that.getPairingBoardName()) : that.getPairingBoardName() != null) return false;
        if (getPeople() != null ? !getPeople().equals(that.getPeople()) : that.getPeople() != null) return false;
        return getPairingTime() != null ? getPairingTime().equals(that.getPairingTime()) : that.getPairingTime() == null;
    }

}
