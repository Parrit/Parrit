package com.parrit.controllers;

import com.parrit.DTOs.UsernameAndPasswordDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.InternalAuthenticationServiceException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.savedrequest.HttpSessionRequestCache;
import org.springframework.security.web.savedrequest.SavedRequest;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.Collections;

@Controller
public class LoginController {

    @Autowired
    private AuthenticationManager authenticationManager;

    //*********************//
    //******  Views  ******//
    //*********************//

    /*
     *  Login page for a project. This method expects that this page was reached
     *  by a redirect due to not being authenticated.  Therefore, we can see which
     *  project was attempted to be logged into by looking at the Session Request Cache
     *
     *  @returns: project-login page with the project name as a model attribute
     */
    @RequestMapping(path = "/login/workspace", method = RequestMethod.GET)
    public String loginWorkspace(final HttpServletRequest request, final HttpServletResponse response, Model model) {
        SavedRequest savedRequest = new HttpSessionRequestCache().getRequest(request, response);

        //TODO: Check to make sure this isn't null -- maybe redirect to homepage if it is
        String originalRequestUrl = savedRequest.getRedirectUrl();
        String workspaceName = originalRequestUrl.substring(originalRequestUrl.lastIndexOf('/') + 1);

        model.addAttribute("workspaceName", workspaceName);
        return "workspace-login";
    }

    @RequestMapping(path = "/error", method = RequestMethod.GET)
    public String error() {
        return "error";
    }

    //********************//
    //******  APIs  ******//
    //********************//

    /*
     *  Attempts to log the user in and returns a href to the project that was logged into
     *
     *  @returns: href string for the workspace that was logged into
     *  @exception: returns a 400 and an error message when failing to login
     */
    @RequestMapping(path = "/login", method = RequestMethod.POST)
    @ResponseBody
    public ResponseEntity<String> login(@RequestBody UsernameAndPasswordDTO loginDetails) {
        try {
            String username = loginDetails.getName();
            String password = loginDetails.getPassword();

            Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(username, password, Collections.emptyList()));

            if (authentication.isAuthenticated()) {
                SecurityContextHolder.getContext().setAuthentication(authentication);
                return new ResponseEntity<>("/" + authentication.getName(), HttpStatus.OK);
            }
        }
        catch(InternalAuthenticationServiceException e) {
            /* No project exists for this name */
            return new ResponseEntity<>("Keeaa!? That’s not your project name.", HttpStatus.BAD_REQUEST);
        }
        catch(BadCredentialsException e) {
            /* Wrong password for existing project */
            return new ResponseEntity<>("Polly want a cracker? Try another password.", HttpStatus.BAD_REQUEST);
        }
        catch(Exception e) {
            return new ResponseEntity<>("/error", HttpStatus.OK);
        }

        return new ResponseEntity<>("/error", HttpStatus.OK);
    }
}
