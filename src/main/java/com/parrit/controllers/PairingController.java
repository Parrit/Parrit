package com.parrit.controllers;

import com.parrit.DTOs.PairingHistoryDTO;
import com.parrit.DTOs.ProjectDTO;
import com.parrit.entities.PairingHistory;
import com.parrit.entities.Project;
import com.parrit.repositories.ProjectRepository;
import com.parrit.services.PairingService;
import com.parrit.transformers.PairingHistoryTransformer;
import com.parrit.transformers.ProjectTransformer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class PairingController {

    private final PairingService pairingService;
    private final ProjectRepository projectRepository;

    @Autowired
    public PairingController(PairingService pairingService, ProjectRepository projectRepository) {
        this.pairingService = pairingService;
        this.projectRepository = projectRepository;
    }

    //********************//
    //******  APIs  ******//
    //********************//

    @PreAuthorize("@authorizationService.canAccessProject(principal, #projectId)")
    @PostMapping(path = "/api/project/{projectId}/pairing")
    public List<PairingHistoryDTO> savePairing(@PathVariable long projectId) {
        Project project = projectRepository.findById(projectId).get();
        List<PairingHistory> pairingHistoryList = pairingService.savePairing(project);
        return PairingHistoryTransformer.transform(pairingHistoryList);
    }

    @PreAuthorize("@authorizationService.canAccessProject(principal, #projectId)")
    @GetMapping(path = "/api/project/{projectId}/pairing/recommend")
    public ProjectDTO getRecommendation(@PathVariable long projectId) {
        Project project = projectRepository.findById(projectId).get();
        Project recommendedProject = pairingService.getRecommendation(project);
        Project updatedProject = projectRepository.save(recommendedProject);
        return ProjectTransformer.transform(updatedProject);
    }

    @PreAuthorize("@authorizationService.canAccessProject(principal, #projectId)")
    @GetMapping(path = "/api/project/{projectId}/pairing/history")
    public List<PairingHistoryDTO> getPairingHistory(@PathVariable long projectId) {
        Project project = projectRepository.findById(projectId).get();
        List<PairingHistory> pairingHistoryList = pairingService.getSortedPairingHistory(project);
        return PairingHistoryTransformer.transform(pairingHistoryList);
    }
}
