package com.parrit.controllers;

import com.parrit.DTOs.PersonDTO;
import com.parrit.DTOs.ProjectDTO;
import com.parrit.DTOs.UsernameAndPasswordDTO;
import com.parrit.entities.PairingBoard;
import com.parrit.entities.Person;
import com.parrit.entities.Project;
import com.parrit.repositories.ProjectRepository;
import com.parrit.transformers.ProjectTransformer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.authentication.encoding.ShaPasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.NestedServletException;

import java.util.ArrayList;

@Controller
public class ProjectController {

    private ProjectRepository projectRepository;

	@Autowired
	public ProjectController(ProjectRepository projectRepository) {
		this.projectRepository = projectRepository;
	}

    //*********************//
    //******  Views  ******//
    //*********************//

    @RequestMapping(path = "/", method = RequestMethod.GET)
    public String getDashboard() {
        return "dashboard";
    }

    @PreAuthorize("@authorizationService.canAccessProject(principal, #projectName)")
    @RequestMapping(path = "/{projectName:.+}", method = RequestMethod.GET)
    public String getProject(@PathVariable String projectName, Model model) {
        Project project = projectRepository.findByName(projectName);
        model.addAttribute("project", ProjectTransformer.transform(project));
        return "project";
    }

    //********************//
    //******  APIs  ******//
    //********************//

    @RequestMapping(path = "/api/project/new", method = RequestMethod.POST, consumes = {"application/json"})
    @ResponseBody
    public void createProject(@RequestBody UsernameAndPasswordDTO usernameAndPasswordDTO) throws NestedServletException {
        if(usernameAndPasswordDTO.getPassword().isEmpty()) {
            throw new NestedServletException("Project Name and/or Password is empty!");
        }
        Project existingProject = projectRepository.findByName(usernameAndPasswordDTO.getName());
        if (existingProject != null) {
          throw new NestedServletException("Project Name already exists!");
        }

        ShaPasswordEncoder encoder = new ShaPasswordEncoder(256);
        String hashedPassword = encoder.encodePassword(usernameAndPasswordDTO.getPassword(), null);

        Project project = new Project(usernameAndPasswordDTO.getName(), hashedPassword, new ArrayList<>(), new ArrayList<>());

        project.getPairingBoards().add(new PairingBoard("COCKATOO", new ArrayList<>()));
        project.getPairingBoards().add(new PairingBoard("MACAW", new ArrayList<>()));
        project.getPairingBoards().add(new PairingBoard("LOVEBIRD", new ArrayList<>()));
        project.getPairingBoards().add(new PairingBoard("PARAKEET", new ArrayList<>()));
        project.getPairingBoards().add(new PairingBoard("DESIGN", new ArrayList<>()));

        PairingBoard exemptBoard = new PairingBoard("OUT OF OFFICE", new ArrayList<>());
        exemptBoard.setExempt(true);
        project.getPairingBoards().add(exemptBoard);

        projectRepository.save(project);
    }

    //TODO: This authorization will not work if the project name is being changed.....
    @PreAuthorize("@authorizationService.canAccessProject(principal, #projectDTO)")
    @RequestMapping(path = "/api/project", method = RequestMethod.POST, consumes = {"application/json"})
    @ResponseBody
    public ResponseEntity<ProjectDTO> saveProject(@RequestBody ProjectDTO projectDTO) {
        Project savedProject = projectRepository.findOne(projectDTO.getId());
        Project updatedProject = ProjectTransformer.merge(savedProject, projectDTO);
        updatedProject = projectRepository.save(updatedProject);
        return new ResponseEntity<>(ProjectTransformer.transform(updatedProject), HttpStatus.OK);
    }

    @PreAuthorize("@authorizationService.canAccessProject(principal, #projectId)")
    @RequestMapping(path="api/project/{projectId}/addPerson", method = RequestMethod.POST, consumes = {"application/json"})
    @ResponseBody
    public ResponseEntity<ProjectDTO> addPerson(@PathVariable long projectId, @RequestBody PersonDTO personDTO) {
        Project savedProject = projectRepository.findOne(projectId);

        Person newPerson = new Person();
        newPerson.setName(personDTO.getName());
        savedProject.getPeople().add(newPerson);

        Project updatedProject = projectRepository.save(savedProject);
        return new ResponseEntity<>(ProjectTransformer.transform(updatedProject), HttpStatus.OK);
    }
}
