package com.parrit.entities;

import javax.persistence.*;

@Entity
public class Person {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    private String name;

    public Person(String name) {
        this.name = name;
    }

    public Person() {}

    public long getId() {
        return id;
    }
    public void setId(long id) {
        this.id = id;
    }
    public String getName() {return this.name;}
    public void setName(String name) {this.name = name;}
}