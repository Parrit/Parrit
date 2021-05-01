package com.parrit.controllers;

import com.parrit.DTOs.PairingBoardDTO;
import com.parrit.DTOs.ProjectDTO;
import com.parrit.entities.PairingBoard;
import com.parrit.entities.Project;
import com.parrit.exceptions.PairingBoardNotFoundException;
import com.parrit.repositories.PairingBoardRepository;
import com.parrit.repositories.ProjectRepository;
import com.parrit.transformers.ProjectTransformer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.ArrayList;
import java.util.HashSet;

@RestController
public class PairingBoardController {

    private final ProjectRepository projectRepository;
    private final PairingBoardRepository pairingBoardRepository;

    @Autowired
    public PairingBoardController(ProjectRepository projectRepository, PairingBoardRepository pairingBoardRepository) {
        this.projectRepository = projectRepository;
        this.pairingBoardRepository = pairingBoardRepository;
    }

    @PreAuthorize("@authorizationService.canAccessProject(principal, #projectId)")
    @PostMapping(path = "/api/project/{projectId}/pairingBoard")
    public ProjectDTO addPairingBoard(@PathVariable long projectId, @RequestBody @Valid PairingBoardDTO pairingBoardDTO) {
        Project savedProject = projectRepository.findById(projectId).get();

        savedProject.getPairingBoards().add(new PairingBoard(pairingBoardDTO.getName(), false, new HashSet<>(), new ArrayList<>()));

        Project updatedProject = projectRepository.save(savedProject);
        return ProjectTransformer.transform(updatedProject);
    }

    @PreAuthorize("@authorizationService.canAccessProject(principal, #projectId)")
    @PutMapping(path = "/api/project/{projectId}/pairingBoard/{pairingBoardId}")
    public ProjectDTO updatePairingBoard(@PathVariable long projectId, @PathVariable long pairingBoardId, @RequestBody @Valid PairingBoardDTO pairingBoardDTO) {
        Project savedProject = projectRepository.findById(projectId).get();

        PairingBoard matchingPairingBoard = savedProject.getPairingBoards().stream()
                .filter(pb -> pb.getId() == pairingBoardId)
                .findFirst()
                .orElseThrow(() -> new PairingBoardNotFoundException("Keeaa!? That pairing board doesn't seem to exist."));

        matchingPairingBoard.setName(pairingBoardDTO.getName());

        Project updatedProject = projectRepository.save(savedProject);
        return ProjectTransformer.transform(updatedProject);
    }

    @PreAuthorize("@authorizationService.canAccessProject(principal, #projectId)")
    @DeleteMapping(path = "/api/project/{projectId}/pairingBoard/{pairingBoardId}")
    public ProjectDTO deletePairingBoard(@PathVariable long projectId, @PathVariable long pairingBoardId) {
        Project savedProject = projectRepository.findById(projectId).get();

        PairingBoard matchingPairingBoard = savedProject.getPairingBoards().stream()
                .filter(pb -> pb.getId() == pairingBoardId)
                .findFirst()
                .orElseThrow(() -> new PairingBoardNotFoundException("Keeaa!? That pairing board doesn't seem to exist."));

        savedProject.getPeople().addAll(matchingPairingBoard.getPeople());
        savedProject.getPairingBoards().remove(matchingPairingBoard);
        pairingBoardRepository.delete(matchingPairingBoard);

        Project updatedProject = projectRepository.save(savedProject);
        return ProjectTransformer.transform(updatedProject);
    }

}
