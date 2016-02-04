package com.parrit.entities;

import javax.persistence.*;

import java.util.Map;

@Entity
@Table
public class State {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    @OneToOne
    private Settings settings;

    @OneToOne
    private Workspace workspace;

    public State() {}

    public long getId() {
        return id;
    }
    public void setId(long id) {
        this.id = id;
    }
    public Settings getSettings() { return settings; }
    public void setSettings(Settings settings) { this.settings = settings; }
    public Workspace getWorkspace() { return workspace; }
    public void setWorkspace(Workspace workspace) { this.workspace = workspace; }

}
