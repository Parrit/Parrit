package com.parrit.controllers;

import com.parrit.repositories.WorkspaceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@Controller
public class DefaultController {

    private WorkspaceRepository workspaceRepository;

    @Autowired
    public DefaultController(WorkspaceRepository workspaceRepository) {
        this.workspaceRepository = workspaceRepository;
    }

    @RequestMapping(path = "/", method = RequestMethod.GET)
    public String get() {
        System.out.println("HIT DEFAULT CONTROLLER /");
        return "index";
    }

    @RequestMapping(path = "/{projectName:.+}", method = RequestMethod.GET)
    public String getHello(@PathVariable String projectName) {
        if (projectName.equals("index.html")) return null;
        System.out.println("HIT DEFAULT CONTROLLER /{" + projectName + "}");
        return "index";
    }

}
