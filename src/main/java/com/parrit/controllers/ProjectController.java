package com.parrit.controllers;

import com.parrit.DTOs.*;
import com.parrit.entities.PairingBoard;
import com.parrit.entities.Person;
import com.parrit.entities.Project;
import com.parrit.exceptions.PairingBoardNotFoundException;
import com.parrit.exceptions.PersonNotFoundException;
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
import java.util.stream.Stream;

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

    @PreAuthorize("@authorizationService.canAccessProject(principal, #projectId)")
    @RequestMapping(path = "/api/project/{projectId}/pairingBoard", method = RequestMethod.POST)
    @ResponseBody
    public ResponseEntity<ProjectDTO> addPairingBoard(@PathVariable long projectId, @RequestBody @Valid PairingBoardDTO pairingBoardDTO) {
        Project savedProject = projectRepository.findOne(projectId);

        savedProject.getPairingBoards().add(new PairingBoard(pairingBoardDTO.getName(), false, new ArrayList<>()));

        Project updatedProject = projectRepository.save(savedProject);
        return new ResponseEntity<>(ProjectTransformer.transform(updatedProject), HttpStatus.OK);
    }

    @PreAuthorize("@authorizationService.canAccessProject(principal, #projectId)")
    @RequestMapping(path = "/api/project/{projectId}/pairingBoard/{pairingBoardId}", method = RequestMethod.PUT)
    @ResponseBody
    public ResponseEntity<ProjectDTO> updatePairingBoard(@PathVariable long projectId, @PathVariable long pairingBoardId, @RequestBody @Valid PairingBoardDTO pairingBoardDTO) {
        Project savedProject = projectRepository.findOne(projectId);

        PairingBoard matchingPairingBoard = savedProject.getPairingBoards().stream()
                .filter(pb -> pb.getId() == pairingBoardId)
                .findFirst()
                .orElseThrow(() -> new PairingBoardNotFoundException("Keeaa!? That pairing board doesn't seem to exist."));

        matchingPairingBoard.setName(pairingBoardDTO.getName());

        Project updatedProject = projectRepository.save(savedProject);
        return new ResponseEntity<>(ProjectTransformer.transform(updatedProject), HttpStatus.OK);
    }

    @PreAuthorize("@authorizationService.canAccessProject(principal, #projectId)")
    @RequestMapping(path = "/api/project/{projectId}/pairingBoard/{pairingBoardId}", method = RequestMethod.DELETE)
    @ResponseBody
    public ResponseEntity<ProjectDTO> deletePairingBoard(@PathVariable long projectId, @PathVariable long pairingBoardId) {
        Project savedProject = projectRepository.findOne(projectId);

        PairingBoard matchingPairingBoard = savedProject.getPairingBoards().stream()
                .filter(pb -> pb.getId() == pairingBoardId)
                .findFirst()
                .orElseThrow(() -> new PairingBoardNotFoundException("Keeaa!? That pairing board doesn't seem to exist."));

        savedProject.getPeople().addAll(matchingPairingBoard.getPeople());
        savedProject.getPairingBoards().remove(matchingPairingBoard);

        Project updatedProject = projectRepository.save(savedProject);
        return new ResponseEntity<>(ProjectTransformer.transform(updatedProject), HttpStatus.OK);
    }

    @PreAuthorize("@authorizationService.canAccessProject(principal, #projectId)")
    @RequestMapping(path = "/api/project/{projectId}/person", method = RequestMethod.POST)
    @ResponseBody
    public ResponseEntity<ProjectDTO> addPerson(@PathVariable long projectId, @RequestBody @Valid PersonDTO personDTO) {
        Project savedProject = projectRepository.findOne(projectId);

        savedProject.getPeople().add(new Person(personDTO.getName()));

        Project updatedProject = projectRepository.save(savedProject);
        return new ResponseEntity<>(ProjectTransformer.transform(updatedProject), HttpStatus.OK);
    }

    @PreAuthorize("@authorizationService.canAccessProject(principal, #projectId)")
    @RequestMapping(path = "/api/project/{projectId}/person/{personId}/position", method = RequestMethod.PUT)
    @ResponseBody
    public ResponseEntity<ProjectDTO> movePerson(@PathVariable long projectId, @PathVariable long personId, @RequestBody @Valid PositionDTO positionDTO) {
        Project savedProject = projectRepository.findOne(projectId);

        Stream<List<Person>> floatingPeople = Stream.of(savedProject.getPeople());
        Stream<List<Person>> pairingBoardPeople = savedProject.getPairingBoards().stream().map(PairingBoard::getPeople);
        List<Person> listWithPerson = Stream.concat(floatingPeople, pairingBoardPeople)
                .filter(ppl -> ppl.stream().anyMatch(p -> p.getId() == personId))
                .findFirst()
                .orElseThrow(() -> new PersonNotFoundException("Keeaa!? That person doesn't seem to exist."));

        Person person = listWithPerson.stream()
                .filter(p -> p.getId() == personId)
                .findFirst()
                .get();
        listWithPerson.remove(person);

        if(positionDTO.isFloating()) {
            savedProject.getPeople().add(person);
        } else {
            PairingBoard matchingPairingBoard = savedProject.getPairingBoards().stream()
                    .filter(pb -> pb.getId() == positionDTO.getPairingBoardId())
                    .findFirst()
                    .orElseThrow(() -> new PairingBoardNotFoundException("Keeaa!? That pairing board doesn't seem to exist."));

            matchingPairingBoard.getPeople().add(person);
        }

        Project updatedProject = projectRepository.save(savedProject);
        return new ResponseEntity<>(ProjectTransformer.transform(updatedProject), HttpStatus.OK);
    }

    @PreAuthorize("@authorizationService.canAccessProject(principal, #projectId)")
    @RequestMapping(path = "/api/project/{projectId}/person/{personId}", method = RequestMethod.DELETE)
    @ResponseBody
    public ResponseEntity<ProjectDTO> deletePerson(@PathVariable long projectId, @PathVariable long personId) {
        Project savedProject = projectRepository.findOne(projectId);

        Stream<List<Person>> floatingPeople = Stream.of(savedProject.getPeople());
        Stream<List<Person>> pairingBoardPeople = savedProject.getPairingBoards().stream().map(PairingBoard::getPeople);
        List<Person> listWithPerson = Stream.concat(floatingPeople, pairingBoardPeople)
                .filter(ppl -> ppl.stream().anyMatch(p -> p.getId() == personId))
                .findFirst()
                .orElseThrow(() -> new PersonNotFoundException("Keeaa!? That person doesn't seem to exist."));

        listWithPerson.removeIf(p -> p.getId() == personId);

        Project updatedProject = projectRepository.save(savedProject);
        return new ResponseEntity<>(ProjectTransformer.transform(updatedProject), HttpStatus.OK);
    }
}
