package com.parrit.controllers;

import com.parrit.DTOs.PairingArrangementDTO;
import com.parrit.entities.PairingArrangement;
import com.parrit.entities.Project;
import com.parrit.repositories.ProjectRepository;
import com.parrit.services.PairingService;
import com.parrit.transformers.PairingHistoryTransformer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@PreAuthorize("@authorizationService.canAccessProject(principal, #projectId)")
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

    @PostMapping(path = "/api/project/{projectId}/pairing")
    public List<PairingArrangementDTO> savePairing(@PathVariable long projectId) {
        Project project = projectRepository.findById(projectId).get();
        pairingService.savePairing(project);
        List<PairingArrangement> pairingHistory = pairingService.getSortedPairingHistory(project);

        return PairingHistoryTransformer.transform(pairingHistory);
    }

    @GetMapping(path = "/api/project/{projectId}/pairing/history")
    public List<PairingArrangementDTO> getPairingHistory(@PathVariable long projectId) {
        Project project = projectRepository.findById(projectId).get();
        List<PairingArrangement> pairingHistoryList = pairingService.getSortedPairingHistory(project);

        return PairingHistoryTransformer.transform(pairingHistoryList);
    }
}
