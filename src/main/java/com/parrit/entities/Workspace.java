package com.parrit.entities;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.List;

@Entity
public class Workspace {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @NotNull
    @Column(unique = true)
    private String name;

    @NotNull
    private String password;

    @OneToMany(targetEntity = Space.class, cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name="workspace_id")
    private List<Space> spaces;

    @OneToMany(targetEntity = Person.class, cascade = CascadeType.ALL)
    @JoinColumn(name="workspace_id")
    private List<Person> people;

    public Workspace() {
    }

    public Workspace(String name, String password, List<Space> spaces, List<Person> people) {
        this.name = name;
        this.password = password;
        this.spaces = spaces;
        this.people = people;
    }

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

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
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
        if (!(o instanceof Workspace)) return false;

        Workspace workspace = (Workspace) o;

        if (getId() != workspace.getId()) return false;
        if (getName() != null ? !getName().equals(workspace.getName()) : workspace.getName() != null) return false;
        if (getPassword() != null ? !getPassword().equals(workspace.getPassword()) : workspace.getPassword() != null) return false;
        if (getSpaces() != null ? !getSpaces().equals(workspace.getSpaces()) : workspace.getSpaces() != null) return false;
        return getPeople() != null ? getPeople().equals(workspace.getPeople()) : workspace.getPeople() == null;

    }

    @Override
    public int hashCode() {
        int result = (int) (getId() ^ (getId() >>> 32));
        result = 31 * result + (getName() != null ? getName().hashCode() : 0);
        result = 31 * result + (getPassword() != null ? getPassword().hashCode() : 0);
        result = 31 * result + (getSpaces() != null ? getSpaces().hashCode() : 0);
        result = 31 * result + (getPeople() != null ? getPeople().hashCode() : 0);
        return result;
    }

    @Override
    public String toString() {
        return "Workspace{" +
            "id=" + id +
            ", name='" + name + '\'' +
            ", password='" + password + '\'' +
            ", spaces=" + spaces +
            ", people=" + people +
            '}';
    }
}