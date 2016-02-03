package com.parrit.controllers;

import com.parrit.repositories.StateRepository;
import com.parrit.entities.State;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
public class StateController {

    StateRepository stateRepository;

	@Autowired
	public StateController(StateRepository repository) {
		this.stateRepository = repository;
	}

    @RequestMapping(path = "/state", method = RequestMethod.GET)
	public ResponseEntity<State> get(@RequestParam long id) {
        State state = stateRepository.findOne(id);
        if(state == null) {
            state = new State();
            state.setId(id);
            state.setJsonContent(defaultJsonContent());
            stateRepository.save(state);
        }
        return new ResponseEntity<>(state, HttpStatus.OK);
    }

    @RequestMapping(path = "/state", method = RequestMethod.POST, consumes = {"application/json"})
	public void save(@RequestBody State state) {
    	stateRepository.save(state);
    }

    private Map<Object, Object> defaultJsonContent() {
        Map<Object, Object> defaultTimPerson = new HashMap<>();
        defaultTimPerson.put("name", "Tim");
        Map<Object, Object> defaultAnthonyPerson = new HashMap<>();
        defaultAnthonyPerson.put("name", "Anthony");
        Map<Object, Object> defaultGauravPerson = new HashMap<>();
        defaultGauravPerson.put("name", "Gaurav");
        Map<Object, Object> defaultMariannaPerson = new HashMap<>();
        defaultMariannaPerson.put("name", "Marianna");
        Map<Object, Object> defaultTonyPerson = new HashMap<>();
        defaultTonyPerson.put("name", "Tony");
        Map<Object, Object> defaultPetePerson = new HashMap<>();
        defaultPetePerson.put("name", "Pete");
        Map<Object, Object> defaultJaredPerson = new HashMap<>();
        defaultJaredPerson.put("name", "Jared");
        Map<Object, Object> defaultFonziePerson = new HashMap<>();
        defaultFonziePerson.put("name", "Fonzie");
        Map<Object, Object> defaultBrianPerson = new HashMap<>();
        defaultBrianPerson.put("name", "Brian");
        Map<Object, Object> defaultKeaPerson = new HashMap<>();
        defaultKeaPerson.put("name", "Kea");
        Map<Object, Object> defaultLancePerson = new HashMap<>();
        defaultLancePerson.put("name", "Lance");
        Map<Object, Object> defaultLizPerson = new HashMap<>();
        defaultLizPerson.put("name", "Liz");
        Map<Object, Object> defaultSreePerson = new HashMap<>();
        defaultSreePerson.put("name", "Sree");

        List<Map<Object, Object>> defaultFloatingPeople = new ArrayList<>();
        defaultFloatingPeople.add(defaultTimPerson);
        defaultFloatingPeople.add(defaultAnthonyPerson);
        defaultFloatingPeople.add(defaultGauravPerson);
        defaultFloatingPeople.add(defaultMariannaPerson);
        defaultFloatingPeople.add(defaultTonyPerson);
        defaultFloatingPeople.add(defaultPetePerson);
        defaultFloatingPeople.add(defaultJaredPerson);
        defaultFloatingPeople.add(defaultFonziePerson);
        defaultFloatingPeople.add(defaultBrianPerson);
        defaultFloatingPeople.add(defaultKeaPerson);
        defaultFloatingPeople.add(defaultLancePerson);
        defaultFloatingPeople.add(defaultLizPerson);
        defaultFloatingPeople.add(defaultSreePerson);

        Map<Object, Object> defaultFloatingStation = new HashMap<>();
        defaultFloatingStation.put("name", "Floating");
        defaultFloatingStation.put("people", defaultFloatingPeople);
        Map<Object, Object> defaultDesignStation = new HashMap<>();
        defaultDesignStation.put("name", "Design");
        defaultDesignStation.put("people", new ArrayList<>());
        Map<Object, Object> defaultProductStation = new HashMap<>();
        defaultProductStation.put("name", "Product");
        defaultProductStation.put("people", new ArrayList<>());
        Map<Object, Object> defaultWellesleyStation = new HashMap<>();
        defaultWellesleyStation.put("name", "Wellesley");
        defaultWellesleyStation.put("people", new ArrayList<>());
        Map<Object, Object> defaultPico2Station = new HashMap<>();
        defaultPico2Station.put("name", "Pico2");
        defaultPico2Station.put("people", new ArrayList<>());
        Map<Object, Object> defaultManchesterStation = new HashMap<>();
        defaultManchesterStation.put("name", "Manchester");
        defaultManchesterStation.put("people", new ArrayList<>());
        Map<Object, Object> defaultLarchmontStation = new HashMap<>();
        defaultLarchmontStation.put("name", "Larchmont");
        defaultLarchmontStation.put("people", new ArrayList<>());
        Map<Object, Object> defaultCulverStation = new HashMap<>();
        defaultCulverStation.put("name", "Culver");
        defaultCulverStation.put("people", new ArrayList<>());
        Map<Object, Object> defaultOut_of_OfficeStation = new HashMap<>();
        defaultOut_of_OfficeStation.put("name", "Out_of_Office");
        defaultOut_of_OfficeStation.put("people", new ArrayList<>());

        List<Map<Object, Object>> defaultStationList = new ArrayList<>();
        defaultStationList.add(defaultFloatingStation);
        defaultStationList.add(defaultDesignStation);
        defaultStationList.add(defaultProductStation);
        defaultStationList.add(defaultWellesleyStation);
        defaultStationList.add(defaultPico2Station);
        defaultStationList.add(defaultManchesterStation);
        defaultStationList.add(defaultLarchmontStation);
        defaultStationList.add(defaultCulverStation);
        defaultStationList.add(defaultOut_of_OfficeStation);

        Map<Object, Object> defaultWorkspaceMap = new HashMap<>();
        defaultWorkspaceMap.put("stations", defaultStationList);

        Map<Object, Object> defaultSettingsMap = new HashMap<>();
        defaultSettingsMap.put("canMove", true);

        Map<Object, Object> defaultJsonMap = new HashMap<>();
        defaultJsonMap.put("settings", defaultSettingsMap);
        defaultJsonMap.put("workspace", defaultWorkspaceMap);

        return defaultJsonMap;
    }
}
