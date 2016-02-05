package com.parrit.entities;

import javax.persistence.*;
import java.util.Collection;

@Entity
public class Space {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    @OneToMany(targetEntity = Person.class)
    private Collection people;

    private String name;

    public Space(String name) {
        this.name = name;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public Collection getPeople() {
        return people;
    }

    public void setPeople(Collection people) {
        this.people = people;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
