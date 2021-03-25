package com.parrit.entities;

import lombok.*;
import org.hibernate.annotations.ColumnDefault;

import javax.persistence.*;

@Entity
@Table(name = "role",
        indexes = {
                @Index(name = "role_pkey", unique = true, columnList = "id")
        }
)
@NoArgsConstructor
@Getter
@Setter
@EqualsAndHashCode
@ToString
public class Role {

    @Id
    @Column(name = "id", nullable = false)
    @ColumnDefault("nextval('role_id_seq')")
    @SequenceGenerator(name = "role_id_gen", sequenceName = "role_id_seq", initialValue = 1, allocationSize = 1)
    @GeneratedValue(generator = "role_id_gen", strategy = GenerationType.SEQUENCE)
    private long id;

    @Column(name = "name", nullable = false, length = 255)
    private String name;

    public Role(String name) {
        this.name = name;
    }

}
