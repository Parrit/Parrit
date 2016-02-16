package com.parrit.entities;

import javax.persistence.*;
import java.util.Collection;

@Entity
public class Workspace {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @OneToMany(targetEntity = Space.class, cascade = CascadeType.ALL, orphanRemoval = true)
    private Collection<Space> spaces;

    @OneToMany(targetEntity = Person.class, cascade = CascadeType.ALL)
    private Collection<Person> people;

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public Collection<Space> getSpaces() {
        return spaces;
    }

    public void setSpaces(Collection<Space> spaces) {
        this.spaces = spaces;
    }

    public Collection<Person> getPeople() {
        return people;
    }

    public void setPeople(Collection<Person> people) {
        this.people = people;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        Workspace workspace = (Workspace) o;

        if (id != workspace.id) return false;
        if (spaces != null ? !spaces.equals(workspace.spaces) : workspace.spaces == null) return false;
        if (people != null ? !people.equals(workspace.people) : workspace.people == null) return false;

        return true;
    }

    @Override
    public String toString() {
        return "Workspace{" +
                "id=" + id +
                ", spaces=" + spaces +
                ", people=" + people +
                '}';
    }
}