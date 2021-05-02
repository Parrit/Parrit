package com.parrit.entities;

import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.ColumnDefault;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "project",
        indexes = {
                @Index(name = "project_pkey", unique = true, columnList = "id")
        },
        uniqueConstraints = {
                @UniqueConstraint(name = "project_name_uk", columnNames = "name")
        }
)
@NoArgsConstructor
@Getter
@Setter
@EqualsAndHashCode
public class Project {

    @Id
    @Column(name = "id", nullable = false)
    @ColumnDefault("nextval('project_id_seq')")
    @SequenceGenerator(name = "project_id_gen", sequenceName = "project_id_seq", initialValue = 1, allocationSize = 1)
    @GeneratedValue(generator = "project_id_gen", strategy = GenerationType.SEQUENCE)
    private long id;

    @Column(name = "name", nullable = false, length = 255)
    private String name;

    @Column(name = "password", nullable = false, length = 255)
    private String password;

    @OneToMany(cascade = CascadeType.ALL)
    @JoinColumn(name = "project_id", nullable = false, foreignKey = @ForeignKey(name = "project_id_fk"))
    private List<PairingBoard> pairingBoards;

    @OneToMany(cascade = CascadeType.ALL)
    @JoinColumn(name = "project_id", nullable = true, foreignKey = @ForeignKey(name = "project_id_fk"))
    private List<Person> people;

    @OneToMany(mappedBy = "project", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<PairingArrangement> pairingArrangements = new ArrayList<>();

    public Project(String name, String password, List<PairingBoard> pairingBoards, List<Person> people, List<PairingArrangement> pairingArrangements) {
        this.name = name;
        this.password = password;
        this.pairingBoards = pairingBoards;
        this.people = people;
        this.pairingArrangements = pairingArrangements;
    }

    @Override
    public String toString() {
        return String.format(
                "Project{" +
                        "id=%d, " +
                        "name='%s', " +
                        "password='**********', " +
                        "pairingBoards=%s, " +
                        "people=%s" +
                        "}", id, name, pairingBoards, people);
    }

}
