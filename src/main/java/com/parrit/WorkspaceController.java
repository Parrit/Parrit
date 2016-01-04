package com.parrit;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.databind.JsonNode;

@RestController
public class WorkspaceController {

	@Autowired 
    WorkspaceRepository repository;

    @RequestMapping(path = "/workspace", method = RequestMethod.POST, consumes = {"application/json"})
    void save( @RequestBody JsonNode jsonData) {
    	String htmlContents = jsonData.path("htmlContents").asText();
        repository.save(new Workspace(htmlContents));
    }
    
    Workspace retrieve() {
    	return repository.findOne(1L);
    }
}