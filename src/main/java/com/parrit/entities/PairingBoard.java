package com.parrit.entities;

import org.hibernate.annotations.ColumnDefault;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name = "pairing_board",
        indexes = {
                @Index(name = "pairing_board_pkey", unique = true, columnList = "id")
        }
)
public class PairingBoard {

    @Id
    @Column(name = "id", nullable = false)
    @ColumnDefault("nextval('pairing_board_id_seq')")
    @SequenceGenerator(name = "pairing_board_id_gen", sequenceName = "pairing_board_id_seq", initialValue = 1, allocationSize = 1)
    @GeneratedValue(generator = "pairing_board_id_gen", strategy = GenerationType.SEQUENCE)
    private long id;

    @Column(name = "name", nullable = false, length = 255)
    private String name;

    @Column(name = "exempt", nullable = false)
    private boolean exempt;

    @OneToMany
    @JoinColumn(name = "pairing_board_id", nullable = true, foreignKey = @ForeignKey(name = "pairing_board_id_fk"))
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
