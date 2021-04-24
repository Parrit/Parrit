package com.parrit.entities;

import lombok.*;
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
@Builder
@AllArgsConstructor
@EqualsAndHashCode
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

}
