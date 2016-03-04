package com.parrit.controllers;

import com.parrit.DTOs.WorkspaceDTO;
import com.parrit.entities.Workspace;
import com.parrit.services.PairingService;
import com.parrit.transformers.WorkspaceTransformer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

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

    @PreAuthorize("@authorizationService.canAccessWorkspace(principal, #workspaceId)")
    @RequestMapping(path = "/api/workspace/{workspaceId}/pairing", method = RequestMethod.POST)
    @ResponseBody
    public void savePairing(@PathVariable long workspaceId) {
        pairingService.savePairing(workspaceId);
    }

    @PreAuthorize("@authorizationService.canAccessWorkspace(principal, #workspaceId)")
    @RequestMapping(path = "/api/workspace/{workspaceId}/pairing/recommend", method = RequestMethod.GET)
    @ResponseBody
    public ResponseEntity<WorkspaceDTO> getRecommendation(@PathVariable long workspaceId) {
        Workspace workspace = pairingService.getRecommendation(workspaceId);
        return new ResponseEntity<>(WorkspaceTransformer.transform(workspace), HttpStatus.OK);
    }
}
