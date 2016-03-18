package com.parrit.entities;

import org.hibernate.validator.constraints.Length;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.List;

@Entity
public class Project {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @NotNull
    @Length(min = 1, max = 36)
    @Column(unique = true)
    private String name;

    @NotNull
    private String password;

    @OneToMany(targetEntity = PairingBoard.class, cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name="project_id")
    private List<PairingBoard> pairingBoards;

    @OneToMany(targetEntity = Person.class, cascade = CascadeType.ALL)
    @JoinColumn(name="project_id")
    private List<Person> people;

    public Project() {
    }

    public Project(String name, String password, List<PairingBoard> pairingBoards, List<Person> people) {
        this.name = name;
        this.password = password;
        this.pairingBoards = pairingBoards;
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

    public List<PairingBoard> getPairingBoards() {
        return pairingBoards;
    }

    public void setPairingBoards(List<PairingBoard> pairingBoards) {
        this.pairingBoards = pairingBoards;
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
        if (!(o instanceof Project)) return false;

        Project project = (Project) o;

        if (getId() != project.getId()) return false;
        if (getName() != null ? !getName().equals(project.getName()) : project.getName() != null) return false;
        if (getPassword() != null ? !getPassword().equals(project.getPassword()) : project.getPassword() != null) return false;
        if (getPairingBoards() != null ? !getPairingBoards().equals(project.getPairingBoards()) : project.getPairingBoards() != null) return false;
        return getPeople() != null ? getPeople().equals(project.getPeople()) : project.getPeople() == null;

    }

    @Override
    public int hashCode() {
        int result = (int) (getId() ^ (getId() >>> 32));
        result = 31 * result + (getName() != null ? getName().hashCode() : 0);
        result = 31 * result + (getPassword() != null ? getPassword().hashCode() : 0);
        result = 31 * result + (getPairingBoards() != null ? getPairingBoards().hashCode() : 0);
        result = 31 * result + (getPeople() != null ? getPeople().hashCode() : 0);
        return result;
    }

    @Override
    public String toString() {
        return "Workspace{" +
            "id=" + id +
            ", name='" + name + '\'' +
            ", password='" + password + '\'' +
            ", pairingBoards=" + pairingBoards +
            ", people=" + people +
            '}';
    }
}