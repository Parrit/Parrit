package com.parrit.controllers;

import com.parrit.DTOs.NewProjectDTO;
import com.parrit.DTOs.ProjectDTO;
import com.parrit.entities.PairingBoard;
import com.parrit.entities.Project;
import com.parrit.exceptions.ProjectNameAlreadyExistsException;
import com.parrit.repositories.ProjectRepository;
import com.parrit.transformers.ProjectTransformer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.authentication.encoding.PasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.ArrayList;
import java.util.List;

@Controller
public class ProjectController {

    private ProjectRepository projectRepository;
    private PasswordEncoder passwordEncoder;

    @Autowired
    public ProjectController(ProjectRepository projectRepository, PasswordEncoder passwordEncoder) {
        this.projectRepository = projectRepository;
        this.passwordEncoder = passwordEncoder;
    }

    //*********************//
    //******  Views  ******//
    //*********************//

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

    @RequestMapping(path = "/api/project", method = RequestMethod.POST)
    @ResponseBody
    public void createProject(@RequestBody @Valid NewProjectDTO newProjectDTO) {
        String projectName = newProjectDTO.getName();

        if (projectRepository.findByName(projectName) != null) {
            throw new ProjectNameAlreadyExistsException("Not again. That name already exists, try a different one.");
        }

        String hashedPassword = passwordEncoder.encodePassword(newProjectDTO.getPassword(), null);

        List<PairingBoard> defaultPairingBoards = new ArrayList<>();
        defaultPairingBoards.add(new PairingBoard("COCKATOO", false, new ArrayList<>()));
        defaultPairingBoards.add(new PairingBoard("MACAW", false, new ArrayList<>()));
        defaultPairingBoards.add(new PairingBoard("LOVEBIRD", false, new ArrayList<>()));
        defaultPairingBoards.add(new PairingBoard("PARAKEET", false, new ArrayList<>()));
        defaultPairingBoards.add(new PairingBoard("DESIGN", false, new ArrayList<>()));
        defaultPairingBoards.add(new PairingBoard("OUT OF OFFICE", true, new ArrayList<>()));

        Project project = new Project(projectName, hashedPassword, defaultPairingBoards, new ArrayList<>());
        projectRepository.save(project);
    }

    @PreAuthorize("@authorizationService.canAccessProject(principal, #projectId)")
    @RequestMapping(path = "/api/project/{projectId}", method = RequestMethod.PUT)
    @ResponseBody
    public ResponseEntity<ProjectDTO> updateProject(@PathVariable long projectId, @RequestBody @Valid ProjectDTO projectDTO) {
        Project existingProject = projectRepository.findOne(projectId);

        Project updatedProject = ProjectTransformer.merge(existingProject, projectDTO);

        updatedProject = projectRepository.save(updatedProject);
        return new ResponseEntity<>(ProjectTransformer.transform(updatedProject), HttpStatus.OK);
    }

}
