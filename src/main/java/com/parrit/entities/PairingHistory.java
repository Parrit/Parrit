package com.parrit.entities;

import javax.persistence.*;
import java.sql.Timestamp;

@Entity
public class PairingHistory {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @ManyToOne(targetEntity = Workspace.class, fetch = FetchType.LAZY)
    @JoinColumn(name = "workspace_id")
    private Workspace workspace;

    @ManyToOne(targetEntity = Person.class, fetch = FetchType.LAZY)
    @JoinColumn(name = "person_one_id")
    private Person personOne;

    @ManyToOne(targetEntity = Person.class, fetch = FetchType.LAZY)
    @JoinColumn(name = "person_two_id")
    private Person personTwo;

    private Timestamp timestamp;

    private long groupId;

    public PairingHistory() {
    }

    public PairingHistory(Workspace workspace, Person personOne, Person personTwo, Timestamp timestamp, long groupId) {
        this.workspace = workspace;
        this.personOne = personOne;
        this.personTwo = personTwo;
        this.timestamp = timestamp;
        this.groupId = groupId;
    }

    public long getId() {
        return id;
    }

    public Workspace getWorkspace() {
        return workspace;
    }

    public Person getPersonOne() {
        return personOne;
    }

    public Person getPersonTwo() {
        return personTwo;
    }

    public Timestamp getTimestamp() {
        return timestamp;
    }

    public long getGroupId() {
        return groupId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        PairingHistory that = (PairingHistory) o;

        if (id != that.id) return false;
        if (groupId != that.groupId) return false;
        if (workspace != null ? !workspace.equals(that.workspace) : that.workspace != null) return false;
        if (personOne != null ? !personOne.equals(that.personOne) : that.personOne != null) return false;
        if (personTwo != null ? !personTwo.equals(that.personTwo) : that.personTwo != null) return false;
        return timestamp != null ? timestamp.equals(that.timestamp) : that.timestamp == null;

    }

    @Override
    public String toString() {
        return "PairingHistory{" +
                "id=" + id +
                ", workspace=" + workspace +
                ", personOne=" + personOne +
                ", personTwo=" + personTwo +
                ", timestamp=" + timestamp +
                ", groupId=" + groupId +
                '}';
    }
}
