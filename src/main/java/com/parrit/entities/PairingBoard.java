package com.parrit.entities;

import org.hibernate.validator.constraints.Length;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.List;

@Entity
public class PairingBoard {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @NotNull
    @Length(min = 1, max = 100)
    private String name;

    @NotNull
    private boolean exempt;

    @OneToMany
    @JoinColumn(name="pairing_board_id")
    private List<Person> people;

    public PairingBoard() {
    }

    public PairingBoard(String name, boolean exempt, List<Person> people) {
        this.name = name;
        this.exempt = exempt;
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

    public boolean isExempt() {
        return exempt;
    }

    public void setExempt(boolean exempt) {
        this.exempt = exempt;
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

        PairingBoard that = (PairingBoard) o;

        if (getId() != that.getId()) return false;
        if (isExempt() != that.isExempt()) return false;
        if (getName() != null ? !getName().equals(that.getName()) : that.getName() != null) return false;
        return getPeople() != null ? getPeople().equals(that.getPeople()) : that.getPeople() == null;
    }

    @Override
    public int hashCode() {
        int result = (int) (getId() ^ (getId() >>> 32));
        result = 31 * result + (getName() != null ? getName().hashCode() : 0);
        result = 31 * result + (isExempt() ? 1 : 0);
        result = 31 * result + (getPeople() != null ? getPeople().hashCode() : 0);
        return result;
    }

    @Override
    public String toString() {
        return "PairingBoard{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", exempt=" + exempt +
                ", people=" + people +
                '}';
    }

}
