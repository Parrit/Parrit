package com.parrit.entities;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Lob;

import org.json.simple.JSONObject;

import java.util.Map;

@Entity
public class State {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    @Lob
    private Map<Object, Object> jsonContent;

    public State() {}

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public Map<Object, Object> getJsonContent() {
        return jsonContent;
    }

    public void setJsonContent(Map<Object, Object> jsonContent) {
        this.jsonContent = jsonContent;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        State state = (State) o;

        if (id != state.id) return false;
        return jsonContent != null ? jsonContent.equals(state.jsonContent) : state.jsonContent == null;

    }

    @Override
    public int hashCode() {
        int result = (int) (id ^ (id >>> 32));
        result = 31 * result + (jsonContent != null ? jsonContent.hashCode() : 0);
        return result;
    }

    @Override
    public String toString() {
        return "State{" +
                "id=" + id +
                ", jsonContent=" + jsonContent +
                '}';
    }
}
