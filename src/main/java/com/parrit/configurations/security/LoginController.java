package com.parrit.configurations.security;

import com.parrit.DTOs.NewWorkspaceDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
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

    @RequestMapping(path = "/login", method = RequestMethod.POST)
    @ResponseBody
    public String login(@RequestBody NewWorkspaceDTO loginDetails) { //TODO: Use Own DTO
        String username = loginDetails.getName();
        String password = loginDetails.getPassword();

        //TODO: Try-Catch This
        Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(username, password, Collections.emptyList()));

        if (authentication.isAuthenticated()) {
            SecurityContextHolder.getContext().setAuthentication(authentication);
            return "/" + authentication.getName();
        }

       return "/error";
    }

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

}
