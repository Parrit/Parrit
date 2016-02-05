package com.parrit.entities;

import javax.persistence.*;

@Entity
@Table
public class Settings {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    private boolean canMove;

    public Settings() {}

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public boolean isCanMove() {
        return canMove;
    }

    public void setCanMove(boolean canMove) {
        this.canMove = canMove;
    }
}
