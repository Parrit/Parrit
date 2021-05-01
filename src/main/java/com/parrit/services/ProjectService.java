package com.parrit.services;

import com.parrit.DTOs.ProjectDTO;
import com.parrit.entities.Project;
import com.parrit.exceptions.ProjectNotFoundException;
import com.parrit.repositories.ProjectRepository;
import org.springframework.stereotype.Service;

@Service
public class ProjectService {
    final ProjectRepository projectRepository;
    final PairingBoardService pairingBoardService;
    final PersonService personService;

    public ProjectService(ProjectRepository projectRepository,
                          PairingBoardService pairingBoardService,
                          PersonService personService) {
        this.projectRepository = projectRepository;
        this.pairingBoardService = pairingBoardService;
        this.personService = personService;
    }

    public Project updateProjectFromDTO(ProjectDTO dto) {
        return projectRepository.findById(dto.getId())
                .map(project -> {
                    project.setPairingBoards(pairingBoardService.updatePairingBoardsBasedOnList(dto.getPairingBoards()));
                    project.setPeople(personService.peopleFromDTOList(dto.getPeople()));
                    projectRepository.save(project);
                    return project;
                })
                .orElseThrow(() -> new ProjectNotFoundException("While updating, could not find project with id: " + dto.getId()));
    }
}
