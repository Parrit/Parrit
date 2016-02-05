package com.parrit.entities;

import javax.persistence.*;
import java.util.Collection;

@Entity
public class Workspace {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
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
}