package com.parrit.controllers;

import com.parrit.DTOs.NewWorkspaceDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.Collections;

@Controller
public class LoginController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @RequestMapping(path = "/login", method = RequestMethod.POST)
    @ResponseBody
    public String login(@RequestBody NewWorkspaceDTO loginDetails) { //TODO: Use Own DTO
        String username = loginDetails.getName();
        String password = loginDetails.getPassword();

        //TODO: Try Catch This
        Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(username, password, Collections.emptyList()));

        if (authentication.isAuthenticated()) {
            SecurityContextHolder.getContext().setAuthentication(authentication);
            return "/" + authentication.getName();
        }

       return "/error";
    }

}
