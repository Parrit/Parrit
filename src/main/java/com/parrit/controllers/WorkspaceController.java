package com.parrit.controllers;

import com.parrit.entities.Workspace;
import com.parrit.repositories.WorkspaceRepository;
import com.parrit.services.PairingHistoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
public class WorkspaceController {

    private WorkspaceRepository workspaceRepository;
    private PairingHistoryService pairingHistoryService;

	@Autowired
	public WorkspaceController(WorkspaceRepository workspaceRepository,
                               PairingHistoryService pairingHistoryService) {
		this.workspaceRepository = workspaceRepository;
        this.pairingHistoryService = pairingHistoryService;
	}

    //*********************//
    //******  Views  ******//
    //*********************//

    @RequestMapping(path = "/", method = RequestMethod.GET)
    public String getWorkspaceNames(Model model) {
        model.addAttribute("workspaceNames", workspaceRepository.getAllWorkspaceNames());
        return "dashboard";
    }

    @RequestMapping(path = "/{workspaceName:.+}", method = RequestMethod.GET)
    public String getWorkspace(@PathVariable String workspaceName, Model model) {
        Workspace workspace = workspaceRepository.findByName(workspaceName);
        model.addAttribute("workspace", workspace);
        return "workspace";
    }

    //********************//
    //******  APIs  ******//
    //********************//

    @RequestMapping(path = "/api/workspace", method = RequestMethod.POST, consumes = {"application/json"})
    @ResponseBody
    public ResponseEntity<Workspace> saveWorkspace(@RequestBody Workspace workspace) {
        return new ResponseEntity<>(workspaceRepository.save(workspace), HttpStatus.OK);
    }

    @RequestMapping(path = "/api/workspace/new", method = RequestMethod.POST, consumes = {"application/json"})
    @ResponseBody
    public ResponseEntity<List<String>> createWorkspace(@RequestBody String name) {
        Workspace workspace = new Workspace();
        workspace.setName(name);
        workspaceRepository.save(workspace);
        return new ResponseEntity<>(workspaceRepository.getAllWorkspaceNames(), HttpStatus.OK);
    }

    @RequestMapping(path = "/api/workspace/pairing", method = RequestMethod.POST, consumes = {"application/json"})
    @ResponseBody
    public void savePairing(@RequestBody Workspace workspace) {
        pairingHistoryService.savePairing(workspace);
    }

    @RequestMapping(path = "/api/workspace/delete/{id}", method = RequestMethod.POST, consumes = {"application/json"})
    @ResponseBody
    public void delete(@PathVariable long id) {
        workspaceRepository.delete(id);
    }
}
