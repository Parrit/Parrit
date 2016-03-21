package com.parrit.entities;

import javax.persistence.*;
import java.sql.Timestamp;
import java.util.List;

@Entity
public class PairingHistory {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @ManyToOne(targetEntity = Project.class, fetch = FetchType.LAZY)
    @JoinColumn(name = "project_id")
    private Project project;

    @ManyToMany(targetEntity = Person.class, fetch = FetchType.LAZY)
    private List<Person> people;

    private Timestamp timestamp;

    private String pairingBoardName;

    public PairingHistory() {
    }

    public PairingHistory(Project project, List<Person> people, Timestamp timestamp, String pairingBoardName) {
        this.project = project;
        this.people = people;
        this.timestamp = timestamp;
        this.pairingBoardName = pairingBoardName;
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

    public String getPairingBoardName() {
        return pairingBoardName;
    }

    public void setPairingBoardName(String pairingBoardName) {
        this.pairingBoardName = pairingBoardName;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof PairingHistory)) return false;

        PairingHistory that = (PairingHistory) o;

        if (getId() != that.getId()) return false;
        if (getProject() != null ? !getProject().equals(that.getProject()) : that.getProject() != null) return false;
        if (getPeople() != null ? !getPeople().equals(that.getPeople()) : that.getPeople() != null) return false;
        if (getTimestamp() != null ? !getTimestamp().equals(that.getTimestamp()) : that.getTimestamp() != null)
            return false;
        return getPairingBoardName() != null ? getPairingBoardName().equals(that.getPairingBoardName()) : that.getPairingBoardName() == null;

    }

    @Override
    public int hashCode() {
        int result = (int) (getId() ^ (getId() >>> 32));
        result = 31 * result + (getProject() != null ? getProject().hashCode() : 0);
        result = 31 * result + (getPeople() != null ? getPeople().hashCode() : 0);
        result = 31 * result + (getTimestamp() != null ? getTimestamp().hashCode() : 0);
        result = 31 * result + (getPairingBoardName() != null ? getPairingBoardName().hashCode() : 0);
        return result;
    }

    @Override
    public String toString() {
        return "PairingHistory{" +
            "id=" + id +
            ", project=" + project +
            ", people=" + people +
            ", timestamp=" + timestamp +
            ", pairingBoardName='" + pairingBoardName + '\'' +
            '}';
    }
}
