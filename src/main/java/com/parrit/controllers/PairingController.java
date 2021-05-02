package com.parrit.controllers;

import com.parrit.DTOs.PairingArrangementDTO;
import com.parrit.entities.PairingArrangement;
import com.parrit.entities.Project;
import com.parrit.repositories.ProjectRepository;
import com.parrit.services.PairingService;
import com.parrit.transformers.PairingHistoryTransformer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

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

    @DeleteMapping(path = "/api/project/{projectId}/pairing/history/{pairingArrangementId}")
    public List<PairingArrangementDTO> deletePairingArrangement(
            @PathVariable long projectId,
            @PathVariable long pairingArrangementId
    ) {
        Project project = projectRepository.findById(projectId).get();

        project.getPairingArrangements().stream()
                .filter(pairingArrangement -> pairingArrangement.getId() == pairingArrangementId)
                .findFirst()
                .ifPresent(pairingArrangement -> {
                    project.getPairingArrangements().remove(pairingArrangement);
                    projectRepository.save(project);
                });

        return PairingHistoryTransformer.transform(pairingService.getSortedPairingHistory(project));
    }
}
