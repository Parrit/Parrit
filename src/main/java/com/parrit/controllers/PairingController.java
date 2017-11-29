package com.parrit.controllers;

import com.parrit.DTOs.PairingHistoryDTO;
import com.parrit.DTOs.ProjectDTO;
import com.parrit.entities.PairingHistory;
import com.parrit.entities.Project;
import com.parrit.services.PairingService;
import com.parrit.transformers.PairingHistoryTransformer;
import com.parrit.transformers.ProjectTransformer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.List;

@Controller
public class PairingController {

    private PairingService pairingService;

    @Autowired
    public PairingController(PairingService pairingService) {
        this.pairingService = pairingService;
    }

    //********************//
    //******  APIs  ******//
    //********************//

    @PreAuthorize("@authorizationService.canAccessProject(principal, #projectId)")
    @RequestMapping(path = "/api/project/{projectId}/pairing", method = RequestMethod.POST)
    @ResponseBody
    public ResponseEntity<List<PairingHistoryDTO>> savePairing(@PathVariable long projectId) {
        List<PairingHistory> pairingHistoryList = pairingService.savePairing(projectId);
        return new ResponseEntity<>(PairingHistoryTransformer.transform(pairingHistoryList), HttpStatus.OK);
    }

    @PreAuthorize("@authorizationService.canAccessProject(principal, #projectId)")
    @RequestMapping(path = "/api/project/{projectId}/pairing/recommend", method = RequestMethod.GET)
    @ResponseBody
    public ResponseEntity<ProjectDTO> getRecommendation(@PathVariable long projectId) {
        Project project = pairingService.getRecommendation(projectId);
        return new ResponseEntity<>(ProjectTransformer.transform(project), HttpStatus.OK);
    }

    @PreAuthorize("@authorizationService.canAccessProject(principal, #projectId)")
    @RequestMapping(path = "/api/project/{projectId}/pairing/history", method = RequestMethod.GET)
    @ResponseBody
    public ResponseEntity<List<PairingHistoryDTO>> getPairingHistory(@PathVariable long projectId) {
        List<PairingHistory> pairingHistoryList = pairingService.getSortedPairingHistory(projectId);
        return new ResponseEntity<>(PairingHistoryTransformer.transform(pairingHistoryList), HttpStatus.OK);
    }
}
