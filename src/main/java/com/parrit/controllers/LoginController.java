package com.parrit.controllers;

import com.parrit.DTOs.LoginDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.InternalAuthenticationServiceException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.savedrequest.HttpSessionRequestCache;
import org.springframework.security.web.savedrequest.SavedRequest;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriUtils;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.validation.Valid;
import java.nio.charset.Charset;
import java.util.Collections;

@Controller
public class LoginController {

    private final AuthenticationManager authenticationManager;

    @Autowired
    public LoginController(AuthenticationManager authenticationManager) {
        this.authenticationManager = authenticationManager;
    }

    //*********************//
    //******  Views  ******//
    //*********************//

    @GetMapping(path = "/")
    public String getDashboard() {
        return "dashboard";
    }

    /*
     *  Login page for a project. This method expects that this page was reached
     *  by a redirect due to not being authenticated.  Therefore, we can see which
     *  project was attempted to be logged into by looking at the Session Request Cache
     *
     *  @returns: login page with the project name as a model attribute
     */
    @GetMapping(path = "/login")
    public String loginProject(final HttpServletRequest request, final HttpServletResponse response, Model model) {
        SavedRequest savedRequest = new HttpSessionRequestCache().getRequest(request, response);

        //TODO: Check to make sure this isn't null -- maybe redirect to homepage if it is
        String originalRequestUrl = savedRequest.getRedirectUrl();
        String projectName = originalRequestUrl.substring(originalRequestUrl.lastIndexOf('/') + 1);
        projectName = UriUtils.decode(projectName, Charset.defaultCharset());

        model.addAttribute("projectName", projectName);
        return "login";
    }

    @GetMapping(path = "/error")
    public String error() {
        return "error";
    }

    //********************//
    //******  APIs  ******//
    //********************//

    /*
     *  Attempts to log the user in and returns a href to the project that was logged into
     *
     *  @returns: href string for the project that was logged into
     *  @throws: InternalAuthenticationServiceException if somehow the user does not get authenticated and nothing else throws an exception
     */
    @PostMapping(path = "/api/login")
    @ResponseBody
    public ResponseEntity<String> login(@RequestBody @Valid LoginDTO loginDTO) throws InternalAuthenticationServiceException {
        String name = loginDTO.getName();
        String password = loginDTO.getPassword();

        Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(name, password, Collections.emptyList()));

        if (authentication.isAuthenticated()) {
            SecurityContextHolder.getContext().setAuthentication(authentication);
            return new ResponseEntity<>("/" + authentication.getName(), HttpStatus.OK);
        }

        throw new InternalAuthenticationServiceException("Unknown authentication failure.");
    }
}
