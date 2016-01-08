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
    	
    	if (repository.count() > 0) {
    		Workspace space = retrieve();
    		space.setHTMLContents(htmlContents);
    		repository.save(space);
    	} else {
            repository.save(new Workspace(htmlContents));
    	}
    }
    
    Workspace retrieve() {
    	Workspace workspace = repository.findOne(1L);
    	if (workspace == null) {
    		workspace = new Workspace("<h3 class=\"text-center\">Floating</h3>"
		    + "<!-- Devs -->"
		    + "<div class=\"yes-drop draggable drag-drop\">Tim</div>"
			+ "<div class=\"draggable drag-drop\">Anthony</div>"
			+ "<div class=\"draggable drag-drop\">Gaurav</div>"
			+ "<div class=\"draggable drag-drop\">Marianna</div>"
			+ "<div class=\"draggable drag-drop\">Tony</div>"
			+ "<div class=\"draggable drag-drop\">Pete</div>"
			+ "<div class=\"draggable drag-drop\">Jared</div>"
			+ "<div class=\"draggable drag-drop\">Fonzie</div>"
			+ "<div class=\"draggable drag-drop\">Brian</div>"
			+ "<div class=\"draggable drag-drop\">Kea</div>"
			+ "<!-- Spaces -->"
			+ "<div class=\"dropzone well\">Wellesley</div>"
			+ "<div class=\"dropzone well\">Pico2</div>"
			+ "<div class=\"dropzone well\">Manchester</div>"
			+ "<div class=\"dropzone well\">Larchmont</div>"
			+ "<div class=\"dropzone well\">Culver</div>"
			+ "<div class=\"dropzone well\">Out of Office</div>");
    	}
    	return workspace;
    }
}