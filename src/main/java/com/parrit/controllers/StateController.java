package com.parrit.controllers;

import com.parrit.entities.*;
import com.parrit.repositories.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
public class StateController {

    StateRepository stateRepository;

	@Autowired
	public StateController(StateRepository repository) {
		this.stateRepository = repository;
	}

    @Autowired
    private SettingsRepository settingsRepository;
    @Autowired
    private WorkspaceRepository workspaceRepository;
    @Autowired
    private SpaceRepository spaceRepository;
    @Autowired
    private PersonRepository personRepository;


    @RequestMapping(path = "/state", method = RequestMethod.GET)
	public ResponseEntity<State> get(@RequestParam long id) {
        State state = stateRepository.findOne(id);
        if(state == null) {
            state = this.defaultState();
            stateRepository.save(state);
        }
        return new ResponseEntity<>(state, HttpStatus.OK);
    }

    @RequestMapping(path = "/state", method = RequestMethod.POST, consumes = {"application/json"})
	public void save(@RequestBody State state) {
    	stateRepository.save(state);
    }

    private State defaultState() {
        Person tim      = new Person("Tim");
        personRepository.save(tim);
        Person gaurav   = new Person("Gaurav");
        personRepository.save(gaurav);
        Person marianna = new Person("Marianna");
        personRepository.save(marianna);
        Person tony     = new Person("Tony");
        personRepository.save(tony);
        Person pete     = new Person("Pete");
        personRepository.save(pete);
        Person jared    = new Person("Jared");
        personRepository.save(jared);
        Person fonzie   = new Person("Fonzie");
        personRepository.save(fonzie);
        Person brian    = new Person("Brian");
        personRepository.save(brian);
        Person kea      = new Person("Kea");
        personRepository.save(kea);
        Person lance    = new Person("Lance");
        personRepository.save(lance);
        Person liz      = new Person("Liz");
        personRepository.save(liz);
        Person sree     = new Person("Sree");
        personRepository.save(sree);

        List people = new ArrayList();
        people.add(tim);
        people.add(gaurav);
        people.add(marianna);
        people.add(tony);
        people.add(pete);
        people.add(jared);
        people.add(fonzie);
        people.add(brian);
        people.add(kea);
        people.add(lance);
        people.add(liz);
        people.add(sree);

        Space floating    = new Space("Floating");
        spaceRepository.save(floating);
        Space design      = new Space("Design");
        spaceRepository.save(design);
        Space product     = new Space("Product");
        spaceRepository.save(product);
        Space wellesley   = new Space("Wellesley");
        spaceRepository.save(wellesley);
        Space pico2       = new Space("Pico2");
        spaceRepository.save(pico2);
        Space manchester  = new Space("Manchester");
        spaceRepository.save(manchester);
        Space larchmont   = new Space("Larchmont");
        spaceRepository.save(larchmont);
        Space culver      = new Space("Culver");
        spaceRepository.save(culver);
        Space outOfOffice = new Space("Out of Office");
        spaceRepository.save(outOfOffice);

        List spaces = new ArrayList();
        spaces.add(floating);
        spaces.add(design);
        spaces.add(product);
        spaces.add(wellesley);
        spaces.add(pico2);
        spaces.add(manchester);
        spaces.add(larchmont);
        spaces.add(culver);
        spaces.add(outOfOffice);

        floating.setPeople(people);
        spaceRepository.save(floating);

        Workspace workspace = new Workspace();
        workspace.setSpaces(spaces);
        workspaceRepository.save(workspace);

        Settings settings = new Settings();
        settings.setCanMove(true);
        settingsRepository.save(settings);

        State state = new State();
        state.setWorkspace(workspace);
        state.setSettings(settings);
        stateRepository.save(state);

        return state;
    }
}
