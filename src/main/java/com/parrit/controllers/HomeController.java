package com.parrit.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller
public class HomeController {

    //*********************//
    //******  Views  ******//
    //*********************//

    @RequestMapping(path = "/", method = RequestMethod.GET)
    public String getUrlMoved() {
        return "url-moved";
    }

    @RequestMapping(path = "/**/{path:[^.]*}", method = RequestMethod.GET)
    public String getUrlMovedAlways() {
        return "url-moved";
    }
}
