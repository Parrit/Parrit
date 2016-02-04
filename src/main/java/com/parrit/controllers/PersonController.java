package com.parrit.controllers;

import com.parrit.repositories.PersonRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class PersonController {

    PersonRepository personRepository;

    @Autowired
    public PersonController(PersonRepository repository) {
        this.personRepository = repository;
    }
}
