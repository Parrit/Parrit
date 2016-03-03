package com.parrit.entities;

import javax.persistence.*;
import java.util.List;

@Entity
public class Space {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @OneToMany(targetEntity = Person.class)
    @JoinColumn(name="space_id")
    private List<Person> people;

    private String name;

    public Space() {}

    public Space(long id, List<Person> people, String name) {
        this.id = id;
        this.people = people;
        this.name = name;
    }

    public long getId() {
        return id;
    }

    public List<Person> getPeople() {
        return people;
    }

    public String getName() {
        return name;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof Space)) return false;

        Space space = (Space) o;

        if (getId() != space.getId()) return false;
        if (getPeople() != null ? !getPeople().equals(space.getPeople()) : space.getPeople() != null) return false;
        return getName() != null ? getName().equals(space.getName()) : space.getName() == null;

    }

    @Override
    public int hashCode() {
        int result = (int) (getId() ^ (getId() >>> 32));
        result = 31 * result + (getPeople() != null ? getPeople().hashCode() : 0);
        result = 31 * result + (getName() != null ? getName().hashCode() : 0);
        return result;
    }

    @Override
    public String toString() {
        return "Space{" +
                "id=" + id +
                ", people=" + people +
                ", name='" + name + '\'' +
                '}';
    }
}
