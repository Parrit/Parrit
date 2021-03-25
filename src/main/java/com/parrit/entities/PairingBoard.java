package com.parrit.entities;

import lombok.*;
import org.hibernate.annotations.ColumnDefault;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name = "pairing_board",
        indexes = {
                @Index(name = "pairing_board_pkey", unique = true, columnList = "id")
        }
)
@Getter
@Setter
@NoArgsConstructor
@EqualsAndHashCode
@ToString
public class PairingBoard {

    @Id
    @Column(name = "id", nullable = false)
    @ColumnDefault("nextval('pairing_board_id_seq')")
    @SequenceGenerator(name = "pairing_board_id_gen", sequenceName = "pairing_board_id_seq", initialValue = 1, allocationSize = 1)
    @GeneratedValue(generator = "pairing_board_id_gen", strategy = GenerationType.SEQUENCE)
    private long id;

    @Column(name = "name", nullable = false, length = 255)
    private String name;

    @Column(name = "exempt", nullable = false)
    private boolean exempt;

    @OneToMany
    @JoinColumn(name = "pairing_board_id", nullable = true, foreignKey = @ForeignKey(name = "pairing_board_id_fk"))
    private List<Person> people;

    @OneToMany(cascade = CascadeType.ALL)
    @JoinColumn(name = "pairing_board_id", nullable = false, foreignKey = @ForeignKey(name = "pairing_board_id_fk"))
    private List<Role> roles;

    public PairingBoard(String name, boolean exempt, List<Person> people, List<Role> roles) {
        this.name = name;
        this.exempt = exempt;
        this.people = people;
        this.roles = roles;
    }

}
