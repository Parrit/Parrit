package com.parrit.entities;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import org.hibernate.annotations.ColumnDefault;

import javax.persistence.*;

@Entity
@Table(name = "person",
        indexes = {
                @Index(name = "person_pkey", unique = true, columnList = "id")
        }
)
@NoArgsConstructor
@Getter
@Setter
@ToString
public class Person {

    @Id
    @Column(name = "id", nullable = false)
    @ColumnDefault("nextval('person_id_seq')")
    @SequenceGenerator(name = "person_id_gen", sequenceName = "person_id_seq", initialValue = 1, allocationSize = 1)
    @GeneratedValue(generator = "person_id_gen", strategy = GenerationType.SEQUENCE)
    private long id;

    @Column(name = "name", nullable = false, length = 255)
    private String name;

    public Person(String name) {
        this.name = name;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof Person)) return false;

        Person person = (Person) o;

        if (getId() != person.getId()) return false;
        return getName() != null ? getName().equals(person.getName()) : person.getName() == null;
    }

    @Override
    public int hashCode() {
        int result = (int) (getId() ^ (getId() >>> 32));
        result = 31 * result + (getName() != null ? getName().hashCode() : 0);
        return result;
    }

}
