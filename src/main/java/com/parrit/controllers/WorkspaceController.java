package com.parrit.controllers;

import com.parrit.DTOs.NewWorkspaceDTO;
import com.parrit.DTOs.WorkspaceDTO;
import com.parrit.entities.Workspace;
import com.parrit.repositories.WorkspaceRepository;
import com.parrit.transformers.WorkspaceTransformer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.authentication.encoding.ShaPasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@Controller
public class WorkspaceController {

    private WorkspaceRepository workspaceRepository;

	@Autowired
	public WorkspaceController(WorkspaceRepository workspaceRepository) {
		this.workspaceRepository = workspaceRepository;
	}

    //*********************//
    //******  Views  ******//
    //*********************//

    @RequestMapping(path = "/", method = RequestMethod.GET)
    public String getWorkspaceNames(Model model) {
        model.addAttribute("workspaceNames", workspaceRepository.getAllWorkspaceNames());
        return "dashboard";
    }

    @PreAuthorize("@authorizationService.canAccessWorkspace(principal, #workspaceName)")
    @RequestMapping(path = "/{workspaceName:.+}", method = RequestMethod.GET)
    public String getWorkspace(@PathVariable String workspaceName, Model model) {
        Workspace workspace = workspaceRepository.findByName(workspaceName);
        model.addAttribute("workspace", workspace); //TODO: Use DTO
        return "workspace";
    }

    //********************//
    //******  APIs  ******//
    //********************//

    @RequestMapping(path = "/api/workspace/new", method = RequestMethod.POST, consumes = {"application/json"})
    @ResponseBody
    public ResponseEntity<List<String>> createWorkspace(@RequestBody NewWorkspaceDTO newWorkspaceDTO) {
        ShaPasswordEncoder encoder = new ShaPasswordEncoder(256);
        String hashedPassword = encoder.encodePassword(newWorkspaceDTO.getPassword(), null);

        Workspace workspace = new Workspace(newWorkspaceDTO.getName(), hashedPassword, new ArrayList<>(), new ArrayList<>());
        workspaceRepository.save(workspace);

        return new ResponseEntity<>(workspaceRepository.getAllWorkspaceNames(), HttpStatus.OK);
    }

    @PreAuthorize("@authorizationService.canAccessWorkspace(principal, #workspace)")
    @RequestMapping(path = "/api/workspace", method = RequestMethod.POST, consumes = {"application/json"})
    @ResponseBody
    public ResponseEntity<WorkspaceDTO> saveWorkspace(@RequestBody Workspace workspace) { //TODO: Have it take in a workspaceDTO
        Workspace savedWorkspace = workspaceRepository.save(workspace);
        return new ResponseEntity<>(WorkspaceTransformer.transform(savedWorkspace), HttpStatus.OK);
    }
}
