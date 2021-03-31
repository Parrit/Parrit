package com.parrit.services;

import com.parrit.DTOs.ProjectDTO;
import com.parrit.entities.Project;
import com.parrit.exceptions.ProjectNotFoundException;
import com.parrit.repositories.ProjectRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.Optional;

@Component
public class ProjectService {
    @Autowired ProjectRepository projectRepository;
    @Autowired PairingBoardService pairingBoardService;
    @Autowired PersonService personService;

    public Project updateProjectFromDTO(ProjectDTO dto) {
        Optional<Project> oProject = projectRepository.findById(dto.getId());
        if (oProject.isPresent()) {
            Project project = oProject.get();
            project.setPairingBoards(pairingBoardService.updatePairingBoardsBasedOnList(dto.getPairingBoards()));
            project.setPeople(personService.peopleFromDTOList(dto.getPeople()));
            projectRepository.save(project);
            return project;
        } else {
            throw new ProjectNotFoundException("While updating, could not find project with id: " + dto.getId());
        }
    }
}
