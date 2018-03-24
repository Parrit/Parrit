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
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.ArrayList;

@Controller
public class PairingBoardController {

    private final ProjectRepository projectRepository;
    private final PairingBoardRepository pairingBoardRepository;

    @Autowired
    public PairingBoardController(ProjectRepository projectRepository, PairingBoardRepository pairingBoardRepository) {
        this.projectRepository = projectRepository;
        this.pairingBoardRepository = pairingBoardRepository;
    }

    @PreAuthorize("@authorizationService.canAccessProject(principal, #projectId)")
    @RequestMapping(path = "/api/project/{projectId}/pairingBoard", method = RequestMethod.POST)
    @ResponseBody
    public ResponseEntity<ProjectDTO> addPairingBoard(@PathVariable long projectId, @RequestBody @Valid PairingBoardDTO pairingBoardDTO) {
        Project savedProject = projectRepository.findById(projectId).get();

        savedProject.getPairingBoards().add(new PairingBoard(pairingBoardDTO.getName(), false, new ArrayList<>(), new ArrayList<>()));

        Project updatedProject = projectRepository.save(savedProject);
        return new ResponseEntity<>(ProjectTransformer.transform(updatedProject), HttpStatus.OK);
    }

    @PreAuthorize("@authorizationService.canAccessProject(principal, #projectId)")
    @RequestMapping(path = "/api/project/{projectId}/pairingBoard/{pairingBoardId}", method = RequestMethod.PUT)
    @ResponseBody
    public ResponseEntity<ProjectDTO> updatePairingBoard(@PathVariable long projectId, @PathVariable long pairingBoardId, @RequestBody @Valid PairingBoardDTO pairingBoardDTO) {
        Project savedProject = projectRepository.findById(projectId).get();

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
        Project savedProject = projectRepository.findById(projectId).get();

        PairingBoard matchingPairingBoard = savedProject.getPairingBoards().stream()
                .filter(pb -> pb.getId() == pairingBoardId)
                .findFirst()
                .orElseThrow(() -> new PairingBoardNotFoundException("Keeaa!? That pairing board doesn't seem to exist."));

        savedProject.getPeople().addAll(matchingPairingBoard.getPeople());
        savedProject.getPairingBoards().remove(matchingPairingBoard);
        pairingBoardRepository.delete(matchingPairingBoard);

        Project updatedProject = projectRepository.save(savedProject);
        return new ResponseEntity<>(ProjectTransformer.transform(updatedProject), HttpStatus.OK);
    }

}
