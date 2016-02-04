package com.parrit.entities;

import javax.persistence.*;
import java.util.Map;

@Entity
public class Workspace {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

}