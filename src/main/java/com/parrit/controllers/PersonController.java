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
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.Set;
import java.util.stream.Stream;

@RestController
public class PersonController {

    private final ProjectRepository projectRepository;

    @Autowired
    public PersonController(ProjectRepository projectRepository) {
        this.projectRepository = projectRepository;
    }

    @PreAuthorize("@authorizationService.canAccessProject(principal, #projectId)")
    @PostMapping(path = "/api/project/{projectId}/person")
    public ProjectDTO addPerson(@PathVariable long projectId, @RequestBody @Valid PersonDTO personDTO) {
        Project savedProject = projectRepository.findById(projectId).get();

        savedProject.getPeople().add(new Person(personDTO.getName()));

        Project updatedProject = projectRepository.save(savedProject);
        return ProjectTransformer.transform(updatedProject);
    }

    @PreAuthorize("@authorizationService.canAccessProject(principal, #projectId)")
    @PutMapping(path = "/api/project/{projectId}/person/{personId}/position")
    public ProjectDTO movePerson(@PathVariable long projectId, @PathVariable long personId, @RequestBody @Valid PersonPositionDTO personPositionDTO) {
        Project savedProject = projectRepository.findById(projectId).get();

        Stream<Set<Person>> floatingPeople = Stream.of(savedProject.getPeople());
        Stream<Set<Person>> pairingBoardPeople = savedProject.getPairingBoards().stream().map(PairingBoard::getPeople);
        Set<Person> listWithPerson = Stream.concat(floatingPeople, pairingBoardPeople)
                .filter(ppl -> ppl.stream().anyMatch(p -> p.getId() == personId))
                .findFirst()
                .orElseThrow(() -> new PersonNotFoundException("Keeaa!? That person doesn't seem to exist."));

        Person person = listWithPerson.stream()
                .filter(p -> p.getId() == personId)
                .findFirst()
                .get();
        listWithPerson.remove(person);

        if (personPositionDTO.isFloating()) {
            savedProject.getPeople().add(person);
        } else {
            PairingBoard matchingPairingBoard = savedProject.getPairingBoards().stream()
                    .filter(pb -> pb.getId() == personPositionDTO.getPairingBoardId())
                    .findFirst()
                    .orElseThrow(() -> new PairingBoardPositionNotFoundException("Keeaa!? That pairing board doesn't seem to exist."));

            matchingPairingBoard.getPeople().add(person);
        }

        Project updatedProject = projectRepository.save(savedProject);
        return ProjectTransformer.transform(updatedProject);
    }

    @PreAuthorize("@authorizationService.canAccessProject(principal, #projectId)")
    @DeleteMapping(path = "/api/project/{projectId}/person/{personId}")
    public ProjectDTO deletePerson(@PathVariable long projectId, @PathVariable long personId) {
        Project savedProject = projectRepository.findById(projectId).get();

        Stream<Set<Person>> floatingPeople = Stream.of(savedProject.getPeople());
        Stream<Set<Person>> pairingBoardPeople = savedProject.getPairingBoards().stream().map(PairingBoard::getPeople);
        Set<Person> listWithPerson = Stream.concat(floatingPeople, pairingBoardPeople)
                .filter(ppl -> ppl.stream().anyMatch(p -> p.getId() == personId))
                .findFirst()
                .orElseThrow(() -> new PersonNotFoundException("Keeaa!? That person doesn't seem to exist."));

        listWithPerson.removeIf(p -> p.getId() == personId);

        Project updatedProject = projectRepository.save(savedProject);
        return ProjectTransformer.transform(updatedProject);
    }

}
