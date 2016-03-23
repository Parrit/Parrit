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

}
