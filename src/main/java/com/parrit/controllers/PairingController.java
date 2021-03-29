package com.parrit.controllers;

import com.parrit.DTOs.PairingHistoryDTO;
import com.parrit.DTOs.ProjectDTO;
import com.parrit.entities.PairingHistory;
import com.parrit.entities.Project;
import com.parrit.repositories.ProjectRepository;
import com.parrit.services.PairingService;
import com.parrit.transformers.PairingHistoryTransformer;
import com.parrit.transformers.ProjectTransformer;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import java.time.Duration;
import java.time.Instant;
import java.util.List;

@Controller
public class PairingController {

    private final PairingService pairingService;
    private final ProjectRepository projectRepository;
    private static final Logger log = LoggerFactory.getLogger(PairingController.class);

    @Autowired
    public PairingController(PairingService pairingService, ProjectRepository projectRepository) {
        this.pairingService = pairingService;
        this.projectRepository = projectRepository;
    }

    //********************//
    //******  APIs  ******//
    //********************//

    @PreAuthorize("@authorizationService.canAccessProject(principal, #projectId)")
    @RequestMapping(path = "/api/project/{projectId}/pairing", method = RequestMethod.POST)
    @ResponseBody
    public ResponseEntity<List<PairingHistoryDTO>> savePairing(@PathVariable long projectId) {
        Project project = projectRepository.findById(projectId).get();
        List<PairingHistory> pairingHistoryList = pairingService.savePairing(project);
        return new ResponseEntity<>(PairingHistoryTransformer.transform(pairingHistoryList), HttpStatus.OK);
    }

    @PreAuthorize("@authorizationService.canAccessProject(principal, #projectId)")
    @RequestMapping(path = "/api/project/{projectId}/pairing/recommend", method = RequestMethod.GET)
    @ResponseBody
    public ResponseEntity<ProjectDTO> getRecommendation(@PathVariable long projectId) {
        Project project = projectRepository.findById(projectId).get();
        Project recommendedProject = pairingService.getRecommendation(project);
        Project updatedProject = projectRepository.save(recommendedProject);
        return new ResponseEntity<>(ProjectTransformer.transform(updatedProject), HttpStatus.OK);
    }

    @PreAuthorize("@authorizationService.canAccessProject(principal, #projectId)")
    @RequestMapping(path = "/api/project/{projectId}/pairing/history", method = RequestMethod.GET)
    @ResponseBody
    public ResponseEntity<List<PairingHistoryDTO>> getPairingHistory(@PathVariable long projectId) {
        Instant start = Instant.now();
        Project project = projectRepository.findById(projectId).get();
        List<PairingHistory> pairingHistoryList = pairingService.getSortedPairingHistory(project);
        ResponseEntity<List<PairingHistoryDTO>> response = new ResponseEntity<>(PairingHistoryTransformer.transform(pairingHistoryList), HttpStatus.OK);
        Instant end = Instant.now();

        log.info("Pairing history endpoint took {} to respond.", Duration.between(start, end).toMillis());
        return response;
    }
}
