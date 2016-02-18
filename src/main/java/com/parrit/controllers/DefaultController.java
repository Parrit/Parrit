package com.parrit.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@Controller
public class DefaultController {

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
