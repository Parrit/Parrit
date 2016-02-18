package com.parrit.restcontrollers;

import com.parrit.entities.*;
import com.parrit.repositories.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(path = "/api/workspace")
public class WorkspaceRestController {

    private WorkspaceRepository workspaceRepository;

	@Autowired
	public WorkspaceRestController(WorkspaceRepository workspaceRepository) {
		this.workspaceRepository = workspaceRepository;
	}

    @RequestMapping(method = RequestMethod.GET)
	public ResponseEntity<Workspace> get(@RequestParam long id) {
        return new ResponseEntity<>(workspaceRepository.findOne(id), HttpStatus.OK);
    }

    @RequestMapping(method = RequestMethod.POST, consumes = {"application/json"})
	public ResponseEntity<Workspace> save(@RequestBody Workspace workspace) {
        return new ResponseEntity<>(workspaceRepository.save(workspace), HttpStatus.OK);
    }
}
