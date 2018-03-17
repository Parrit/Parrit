package com.parrit.controllers;

import com.parrit.DTOs.PersonDTO;
import com.parrit.DTOs.PersonPositionDTO;
import com.parrit.DTOs.ProjectDTO;
import com.parrit.entities.PairingBoard;
import com.parrit.entities.Person;
import com.parrit.entities.Project;
import com.parrit.exceptions.PairingBoardPositionNotFoundException;
import com.parrit.exceptions.PersonNotFoundException;
import com.parrit.repositories.ProjectRepository;
import com.parrit.transformers.ProjectTransformer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
import java.util.stream.Stream;

@Controller
public class PersonController {

    private final ProjectRepository projectRepository;

    @Autowired
    public PersonController(ProjectRepository projectRepository) {
        this.projectRepository = projectRepository;
    }

    @PreAuthorize("@authorizationService.canAccessProject(principal, #projectId)")
    @RequestMapping(path = "/api/project/{projectId}/person", method = RequestMethod.POST)
    @ResponseBody
    public ResponseEntity<ProjectDTO> addPerson(@PathVariable long projectId, @RequestBody @Valid PersonDTO personDTO) {
        Project savedProject = projectRepository.findById(projectId).get();

        savedProject.getPeople().add(new Person(personDTO.getName()));

        Project updatedProject = projectRepository.save(savedProject);
        return new ResponseEntity<>(ProjectTransformer.transform(updatedProject), HttpStatus.OK);
    }

    @PreAuthorize("@authorizationService.canAccessProject(principal, #projectId)")
    @RequestMapping(path = "/api/project/{projectId}/person/{personId}/position", method = RequestMethod.PUT)
    @ResponseBody
    public ResponseEntity<ProjectDTO> movePerson(@PathVariable long projectId, @PathVariable long personId, @RequestBody @Valid PersonPositionDTO personPositionDTO) {
        Project savedProject = projectRepository.findById(projectId).get();

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

        if(personPositionDTO.isFloating()) {
            savedProject.getPeople().add(person);
        } else {
            PairingBoard matchingPairingBoard = savedProject.getPairingBoards().stream()
                    .filter(pb -> pb.getId() == personPositionDTO.getPairingBoardId())
                    .findFirst()
                    .orElseThrow(() -> new PairingBoardPositionNotFoundException("Keeaa!? That pairing board doesn't seem to exist."));

            matchingPairingBoard.getPeople().add(person);
        }

        Project updatedProject = projectRepository.save(savedProject);
        return new ResponseEntity<>(ProjectTransformer.transform(updatedProject), HttpStatus.OK);
    }

    @PreAuthorize("@authorizationService.canAccessProject(principal, #projectId)")
    @RequestMapping(path = "/api/project/{projectId}/person/{personId}", method = RequestMethod.DELETE)
    @ResponseBody
    public ResponseEntity<ProjectDTO> deletePerson(@PathVariable long projectId, @PathVariable long personId) {
        Project savedProject = projectRepository.findById(projectId).get();

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
