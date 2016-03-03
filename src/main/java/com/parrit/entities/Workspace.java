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

    public Workspace() {
    }

    public Workspace(String name, List<Space> spaces, List<Person> people) {
        this.name = name;
        this.spaces = spaces;
        this.people = people;
    }

    public Workspace(long id, String name, List<Space> spaces, List<Person> people) {
        this.id = id;
        this.name = name;
        this.spaces = spaces;
        this.people = people;
    }

    public long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public List<Space> getSpaces() {
        return spaces;
    }

    public List<Person> getPeople() {
        return people;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof Workspace)) return false;

        Workspace workspace = (Workspace) o;

        if (getId() != workspace.getId()) return false;
        if (getName() != null ? !getName().equals(workspace.getName()) : workspace.getName() != null) return false;
        if (getSpaces() != null ? !(getSpaces().size() == workspace.getSpaces().size() && getSpaces().containsAll(workspace.getSpaces())) : workspace.getSpaces() != null) return false;
        return getPeople() != null ? (getPeople().size() == workspace.getPeople().size() && getPeople().containsAll(workspace.getPeople())) : workspace.getPeople() == null;

    }

    @Override
    public int hashCode() {
        int result = (int) (getId() ^ (getId() >>> 32));
        result = 31 * result + (getName() != null ? getName().hashCode() : 0);
        result = 31 * result + (getSpaces() != null ? getSpaces().hashCode() : 0);
        result = 31 * result + (getPeople() != null ? getPeople().hashCode() : 0);
        return result;
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