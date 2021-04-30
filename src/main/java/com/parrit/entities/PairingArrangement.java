package com.parrit.entities;

import lombok.*;

import javax.persistence.*;
import java.sql.Timestamp;
import java.util.Set;

@Entity
@Table(name = "pairing_arrangement")
@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode
@ToString
public class PairingArrangement {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @OneToMany(cascade = CascadeType.ALL)
    @JoinColumn(name = "pairing_arrangement_id", foreignKey = @ForeignKey(name = "FK_pairing_history__pairing_arrangement"))
    Set<PairingHistory> pairingHistories;

    @Column(name = "pairing_time", nullable = false)
    private Timestamp pairingTime;

    @ManyToOne
    @JoinColumn(name = "project_id", nullable = false, foreignKey = @ForeignKey(name = "FK_pairing__arrangement_project"))
    private Project project;
}