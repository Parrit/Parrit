package com.parrit.entities;

import lombok.*;
import org.hibernate.annotations.ColumnDefault;

import javax.persistence.*;
import java.sql.Timestamp;
import java.util.List;

import static javax.persistence.FetchType.LAZY;

@Entity
@Table(name = "pairing_history",
        indexes = {
                @Index(name = "pairing_history_pkey", unique = true, columnList = "id")
        }
)
@NoArgsConstructor
@Getter
@Setter
@EqualsAndHashCode
@ToString
@Builder
@AllArgsConstructor
@With
public class PairingHistory {

    @Id
    @Column(name = "id", nullable = false)
    @ColumnDefault("nextval('pairing_history_id_seq')")
    @SequenceGenerator(name = "pairing_history_id_gen", sequenceName = "pairing_history_id_seq", initialValue = 1, allocationSize = 1)
    @GeneratedValue(generator = "pairing_history_id_gen", strategy = GenerationType.SEQUENCE)
    private long id;

    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "project_id", nullable = false, foreignKey = @ForeignKey(name = "project_id_fk"))
    private Project project;

    @Column(name = "pairing_board_name", nullable = false, length = 255)
    private String pairingBoardName;

    @ManyToMany
    @JoinTable(name = "pairing_history_people",
            joinColumns = @JoinColumn(name = "pairing_history_id", nullable = false, foreignKey = @ForeignKey(name = "pairing_history_fk")),
            inverseJoinColumns = @JoinColumn(name = "person_id", nullable = false, foreignKey = @ForeignKey(name = "person_id_fk"))
    )
    private List<Person> people;

    @Column(name = "timestamp", nullable = false)
    private Timestamp timestamp;

    public PairingHistory(Project project, String pairingBoardName, List<Person> people, Timestamp timestamp) {
        this.project = project;
        this.pairingBoardName = pairingBoardName;
        this.people = people;
        this.timestamp = timestamp;
    }

}
