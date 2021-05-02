package com.parrit.controllers;

import com.parrit.DTOs.ChangePasswordDTO;
import com.parrit.DTOs.NewProjectDTO;
import com.parrit.DTOs.ProjectDTO;
import com.parrit.entities.PairingBoard;
import com.parrit.entities.Person;
import com.parrit.entities.Project;
import com.parrit.exceptions.ProjectNameAlreadyExistsException;
import com.parrit.repositories.ProjectRepository;
import com.parrit.services.ProjectService;
import com.parrit.transformers.ProjectTransformer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Controller
public class ProjectController {

    private final ProjectRepository projectRepository;
    private final PasswordEncoder passwordEncoder;
    private final ProjectService projectService;

    @Autowired
    public ProjectController(
            ProjectRepository projectRepository,
            PasswordEncoder passwordEncoder,
            ProjectService projectService
    ) {
        this.projectRepository = projectRepository;
        this.passwordEncoder = passwordEncoder;
        this.projectService = projectService;
    }

    //*********************//
    //******  Views  ******//
    //*********************//

    @PreAuthorize("@authorizationService.canAccessProject(principal, #projectName)")
    @GetMapping(path = "/{projectName:.+}")
    public String getProject(@PathVariable String projectName, Model model) {
        Project project = projectRepository.findByName(projectName).get();
        model.addAttribute("project", ProjectTransformer.transform(project));
        return "project";
    }

    //********************//
    //******  APIs  ******//
    //********************//

    @PostMapping(path = "/api/project")
    @ResponseBody
    public void createProject(@RequestBody @Valid NewProjectDTO newProjectDTO) {
        String projectName = newProjectDTO.getName();

        if (projectRepository.findByName(projectName).isPresent()) {
            throw new ProjectNameAlreadyExistsException("Not again. That name already exists, try a different one.");
        }

        String hashedPassword = passwordEncoder.encode(newProjectDTO.getPassword());

        List<PairingBoard> defaultPairingBoards = new ArrayList<>();
        defaultPairingBoards.add(new PairingBoard("COCKATOO", false, new ArrayList<>(), new ArrayList<>()));
        defaultPairingBoards.add(new PairingBoard("MACAW", false, new ArrayList<>(), new ArrayList<>()));
        defaultPairingBoards.add(new PairingBoard("DESIGN", false, new ArrayList<>(), new ArrayList<>()));
        defaultPairingBoards.add(new PairingBoard("OUT OF OFFICE", true, new ArrayList<>(), new ArrayList<>()));

        Project project = new Project(projectName, hashedPassword, defaultPairingBoards, new ArrayList<>(), List.of());
        projectRepository.save(project);
    }

    @PreAuthorize("@authorizationService.canAccessProject(principal, #projectId)")
    @PutMapping(path = "/api/project/{projectId}/password")
    @ResponseBody
    public void changePassword(@PathVariable long projectId, @RequestBody @Valid ChangePasswordDTO changePasswordDTO) {
        Project existingProject = projectRepository.findById(projectId).get();

        String hashedPassword = passwordEncoder.encode(changePasswordDTO.getPassword());
        existingProject.setPassword(hashedPassword);

        projectRepository.save(existingProject);
    }

    @PreAuthorize("@authorizationService.canAccessProject(principal, #projectId)")
    @PutMapping(path = "/api/project/{projectId}/reset")
    @ResponseBody
    public ProjectDTO resetProject(@PathVariable long projectId) {
        Project existingProject = projectRepository.findById(projectId).get();

        List<PairingBoard> nonExemptPairingBoards = existingProject.getPairingBoards().stream()
                .filter(pb -> !pb.isExempt())
                .collect(Collectors.toList());

        List<Person> allPeopleInNonExemptPairingBoards = nonExemptPairingBoards.stream()
                .flatMap(pb -> pb.getPeople().stream())
                .collect(Collectors.toList());

        nonExemptPairingBoards.forEach(pb -> pb.getPeople().clear());
        existingProject.getPeople().addAll(allPeopleInNonExemptPairingBoards);

        Project updatedProject = projectRepository.save(existingProject);
        return ProjectTransformer.transform(updatedProject);
    }

    @PreAuthorize("@authorizationService.canAccessProject(principal, #projectId)")
    @RequestMapping(path = "/api/project/{projectId}/update", method = RequestMethod.PUT)
    @ResponseBody
    public ProjectDTO updateProject(@RequestBody ProjectDTO body, @PathVariable long projectId) {
        Project project = projectService.updateProjectFromDTO(body);
        return ProjectTransformer.transform(project);
    }

}
