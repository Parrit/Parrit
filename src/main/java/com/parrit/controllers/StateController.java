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

    private StateRepository stateRepository;
    private SettingsRepository settingsRepository;
    private WorkspaceRepository workspaceRepository;
    private SpaceRepository spaceRepository;
    private PersonRepository personRepository;

	@Autowired
	public StateController(StateRepository repository,
                           SettingsRepository settingsRepository,
                           WorkspaceRepository workspaceRepository,
                           SpaceRepository spaceRepository,
                           PersonRepository personRepository) {
		this.stateRepository = repository;
        this.settingsRepository = settingsRepository;
        this.workspaceRepository = workspaceRepository;
        this.spaceRepository = spaceRepository;
        this.personRepository = personRepository;
	}

    @RequestMapping(path = "/state", method = RequestMethod.GET)
	public ResponseEntity<State> get(@RequestParam long id) {
        State state = stateRepository.findOne(id);
        if(state == null) {
            state = defaultState();
            state.setId(id);
            state = stateRepository.save(state);
        }
        return new ResponseEntity<>(state, HttpStatus.OK);
    }

    @RequestMapping(path = "/state", method = RequestMethod.POST, consumes = {"application/json"})
	public void save(@RequestBody State state) {
    	stateRepository.save(state);
    }

    private State defaultState() {
        Person tim      = new Person("Tim");
        Person gaurav   = new Person("Gaurav");
        Person marianna = new Person("Marianna");
        Person tony     = new Person("Tony");
        Person pete     = new Person("Pete");
        Person jared    = new Person("Jared");
        Person fonzie   = new Person("Fonzie");
        Person brian    = new Person("Brian");
        Person kea      = new Person("Kea");
        Person lance    = new Person("Lance");
        Person liz      = new Person("Liz");
        Person sree     = new Person("Sree");

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
        Space design      = new Space("Design");
        Space product     = new Space("Product");
        Space wellesley   = new Space("Wellesley");
        Space pico2       = new Space("Pico2");
        Space manchester  = new Space("Manchester");
        Space larchmont   = new Space("Larchmont");
        Space culver      = new Space("Culver");
        Space outOfOffice = new Space("Out of Office");

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
        design.setPeople(new ArrayList());
        product.setPeople(new ArrayList());
        wellesley.setPeople(new ArrayList());
        pico2.setPeople(new ArrayList());
        manchester.setPeople(new ArrayList());
        larchmont.setPeople(new ArrayList());
        culver.setPeople(new ArrayList());
        outOfOffice.setPeople(new ArrayList());

        Workspace workspace = new Workspace();
        workspace.setSpaces(spaces);

        Settings settings = new Settings();
        settings.setCanMove(true);

        State state = new State();
        state.setWorkspace(workspace);
        state.setSettings(settings);

        return state;
    }
}
