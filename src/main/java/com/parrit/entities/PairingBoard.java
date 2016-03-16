package com.parrit.entities;

import javax.persistence.*;
import java.util.List;

@Entity
public class PairingBoard {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    private String name;

    @OneToMany(targetEntity = Person.class)
    @JoinColumn(name="pairing_board_id")
    private List<Person> people;

    public PairingBoard() {}

    public PairingBoard(String name, List<Person> people) {
        this.name = name;
        this.people = people;
    }

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

    public List<Person> getPeople() {
        return people;
    }

    public void setPeople(List<Person> people) {
        this.people = people;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof PairingBoard)) return false;

        PairingBoard pairingBoard = (PairingBoard) o;

        if (getId() != pairingBoard.getId()) return false;
        if (getName() != null ? !getName().equals(pairingBoard.getName()) : pairingBoard.getName() != null) return false;
        return getPeople() != null ? getPeople().equals(pairingBoard.getPeople()) : pairingBoard.getPeople() == null;

    }

    @Override
    public int hashCode() {
        int result = (int) (getId() ^ (getId() >>> 32));
        result = 31 * result + (getName() != null ? getName().hashCode() : 0);
        result = 31 * result + (getPeople() != null ? getPeople().hashCode() : 0);
        return result;
    }

    @Override
    public String toString() {
        return "PairingBoard{" +
            "id=" + id +
            ", name='" + name + '\'' +
            ", people=" + people +
            '}';
    }
}
