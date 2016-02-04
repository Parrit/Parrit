package com.parrit.controllers;

import com.parrit.repositories.WorkspaceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
public class WorkspaceController {

    WorkspaceRepository workspaceRepository;

    @Autowired
    public WorkspaceController(WorkspaceRepository repository) {
        this.workspaceRepository = repository;
    }
}
