package com.parrit.entities;

import javax.persistence.*;
import java.util.Collection;

@Entity
public class Workspace {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @OneToMany(targetEntity = Space.class)
    private Collection spaces;

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public Collection getSpaces() {
        return spaces;
    }

    public void setSpaces(Collection spaces) {
        this.spaces = spaces;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        Workspace workspace = (Workspace) o;

        if (id != workspace.id) return false;
        if (spaces != null ? !spaces.equals(workspace.spaces) : workspace.spaces == null) return false;

        return true;
    }
}