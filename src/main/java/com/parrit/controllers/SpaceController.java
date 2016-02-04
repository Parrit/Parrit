package com.parrit.controllers;

import com.parrit.repositories.SpaceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class SpaceController {

    SpaceRepository spaceRepository;

    @Autowired
    public SpaceController(SpaceRepository repository) {
        this.spaceRepository = repository;
    }
}
