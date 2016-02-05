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

	@Autowired
	public StateController(StateRepository repository) {
		this.stateRepository = repository;
	}

    @RequestMapping(path = "/state", method = RequestMethod.GET)
	public ResponseEntity<State> get(@RequestParam long id) {
        return new ResponseEntity<>(stateRepository.findOne(id), HttpStatus.OK);
    }

    @RequestMapping(path = "/state", method = RequestMethod.POST, consumes = {"application/json"})
	public void save(@RequestBody State state) {
    	stateRepository.save(state);
    }
}
