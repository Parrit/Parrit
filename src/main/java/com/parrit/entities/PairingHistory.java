package com.parrit.entities;

import org.hibernate.annotations.ColumnDefault;

import javax.persistence.*;
import java.sql.Timestamp;
import java.util.List;

@Entity
@Table(name = "pairing_history",
        indexes = {
                @Index(name = "pairing_history_pkey", unique = true, columnList = "id")
        }
)
public class PairingHistory {

    @Id
    @Column(name = "id", nullable = false)
    @ColumnDefault("nextval('pairing_history_id_seq')")
    @SequenceGenerator(name = "pairing_history_id_gen", sequenceName = "pairing_history_id_seq", initialValue = 1, allocationSize = 1)
    @GeneratedValue(generator = "pairing_history_id_gen", strategy = GenerationType.SEQUENCE)
    private long id;

    @ManyToOne
    @JoinColumn(name = "project_id", nullable = false, foreignKey = @ForeignKey(name = "project_id_fk"))
    private Project project;

    @Column(name = "pairing_board_name", nullable = false, length = 255)
    private String pairingBoardName;

    @ManyToMany
    @JoinTable(name = "pairing_history_people",
            joinColumns = @JoinColumn(name = "pairing_history_id", nullable = false, foreignKey = @ForeignKey(name = "pairing_history_fk")),
            inverseJoinColumns = @JoinColumn(name = "person_id", nullable = false, foreignKey = @ForeignKey(name = "person_id_fk"))
    )
    private List<Person> people;

    @Column(name = "timestamp", nullable = false)
    private Timestamp timestamp;

    public PairingHistory() {
    }

    public PairingHistory(Project project, String pairingBoardName, List<Person> people, Timestamp timestamp) {
        this.project = project;
        this.pairingBoardName = pairingBoardName;
        this.people = people;
        this.timestamp = timestamp;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public Project getProject() {
        return project;
    }

    public void setProject(Project project) {
        this.project = project;
    }

    public String getPairingBoardName() {
        return pairingBoardName;
    }

    public void setPairingBoardName(String pairingBoardName) {
        this.pairingBoardName = pairingBoardName;
    }

    public List<Person> getPeople() {
        return people;
    }

    public void setPeople(List<Person> people) {
        this.people = people;
    }

    public Timestamp getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(Timestamp timestamp) {
        this.timestamp = timestamp;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof PairingHistory)) return false;

        PairingHistory that = (PairingHistory) o;

        if (getId() != that.getId()) return false;
        if (getProject() != null ? !getProject().equals(that.getProject()) : that.getProject() != null) return false;
        if (getPairingBoardName() != null ? !getPairingBoardName().equals(that.getPairingBoardName()) : that.getPairingBoardName() != null) return false;
        if (getPeople() != null ? !getPeople().equals(that.getPeople()) : that.getPeople() != null) return false;
        return getTimestamp() != null ? getTimestamp().equals(that.getTimestamp()) : that.getTimestamp() == null;
    }

    @Override
    public int hashCode() {
        int result = (int) (getId() ^ (getId() >>> 32));
        result = 31 * result + (getProject() != null ? getProject().hashCode() : 0);
        result = 31 * result + (getPairingBoardName() != null ? getPairingBoardName().hashCode() : 0);
        result = 31 * result + (getPeople() != null ? getPeople().hashCode() : 0);
        result = 31 * result + (getTimestamp() != null ? getTimestamp().hashCode() : 0);
        return result;
    }

    @Override
    public String toString() {
        return "PairingHistory{" +
                "id=" + id +
                ", project=" + project +
                ", pairingBoardName='" + pairingBoardName + '\'' +
                ", people=" + people +
                ", timestamp=" + timestamp +
                '}';
    }

}
