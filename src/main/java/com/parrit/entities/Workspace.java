package com.parrit.entities;

import javax.persistence.*;
import java.util.List;

@Entity
public class Workspace {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(unique = true)
    private String name;

    @OneToMany(targetEntity = Space.class, cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name="workspace_id")
    private List<Space> spaces;

    @OneToMany(targetEntity = Person.class, cascade = CascadeType.ALL)
    @JoinColumn(name="workspace_id")
    private List<Person> people;

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

    public List<Space> getSpaces() {
        return spaces;
    }

    public void setSpaces(List<Space> spaces) {
        this.spaces = spaces;
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
        if (o == null || getClass() != o.getClass()) return false;

        Workspace workspace = (Workspace) o;

        if (id != workspace.id) return false;
        if (name != null ? !name.equals(workspace.name) : workspace.name != null) return false;
        if (spaces != null ? !spaces.equals(workspace.spaces) : workspace.spaces != null) return false;
        return people != null ? people.equals(workspace.people) : workspace.people == null;

    }

    @Override
    public String toString() {
        return "Workspace{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", spaces=" + spaces +
                ", people=" + people +
                '}';
    }
}