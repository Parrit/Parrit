package com.parrit.entities;

import javax.persistence.*;

@Entity
public class State {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @OneToOne(cascade = CascadeType.ALL)
    private Settings settings;

    @OneToOne(cascade = CascadeType.ALL)
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

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        State state = (State) o;

        if (id != state.id) return false;
        if (settings != null ? !settings.equals(state.settings) : state.settings != null) return false;
        if (workspace != null ? !workspace.equals(state.workspace) : state.workspace == null) return false;

        return true;
    }
}
