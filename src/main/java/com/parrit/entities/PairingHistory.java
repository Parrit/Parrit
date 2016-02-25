package com.parrit.entities;

import javax.persistence.*;
import java.sql.Timestamp;

@Entity
public class PairingHistory {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    private long workspaceId;

    private long personOneId;

    private long personTwoId;

    private Timestamp timestamp;

    private long groupId;

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public long getWorkspaceId() {
        return workspaceId;
    }

    public void setWorkspaceId(long workspaceId) {
        this.workspaceId = workspaceId;
    }

    public long getPersonOneId() {
        return personOneId;
    }

    public void setPersonOneId(long personOneId) {
        this.personOneId = personOneId;
    }

    public long getPersonTwoId() {
        return personTwoId;
    }

    public void setPersonTwoId(long personTwoId) {
        this.personTwoId = personTwoId;
    }

    public Timestamp getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(Timestamp timestamp) {
        this.timestamp = timestamp;
    }

    public long getGroupId() {
        return groupId;
    }

    public void setGroupId(long groupId) {
        this.groupId = groupId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        PairingHistory that = (PairingHistory) o;

        if (id != that.id) return false;
        if (workspaceId != that.workspaceId) return false;
        if (personOneId != that.personOneId) return false;
        if (personTwoId != that.personTwoId) return false;
        if (groupId != that.groupId) return false;
        return timestamp != null ? timestamp.equals(that.timestamp) : that.timestamp == null;

    }

    @Override
    public String toString() {
        return "PairingHistory{" +
                "id=" + id +
                ", workspaceId=" + workspaceId +
                ", personOneId=" + personOneId +
                ", personTwoId=" + personTwoId +
                ", timestamp=" + timestamp +
                ", groupId=" + groupId +
                '}';
    }
}
