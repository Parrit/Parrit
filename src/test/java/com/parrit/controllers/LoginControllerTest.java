package com.parrit.controllers;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.parrit.DTOs.LoginDTO;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;

import static org.hamcrest.Matchers.equalTo;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@RunWith(SpringRunner.class)
@WebMvcTest(controllers = LoginController.class, secure = false)
public class LoginControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @MockBean
    private AuthenticationManager mockAuthenticationManager;

    //*********************//
    //******  Views  ******//
    //*********************//

    @Test
    public void getDashboard_returnsDashboardView() throws Exception {
        mockMvc.perform(get("/"))
                .andExpect(status().isOk())
                .andExpect(view().name("dashboard"));
    }

    @Test
    public void error_returnsErrorView() throws Exception {
        mockMvc.perform(get("/error"))
                .andExpect(status().isOk())
                .andExpect(view().name("error"));
    }

    //********************//
    //******  APIs  ******//
    //********************//

    @Test
    public void login_whenSuccessful_returnsUrlForProject() throws Exception {
        LoginDTO loginDTO = new LoginDTO();
        loginDTO.setName("someName");
        loginDTO.setPassword("somePassword");

        Authentication authentication = mock(Authentication.class);
        when(authentication.isAuthenticated()).thenReturn(true);
        when(authentication.getName()).thenReturn("projectName");
        when(mockAuthenticationManager.authenticate(any(UsernamePasswordAuthenticationToken.class)))
                .thenReturn(authentication);

        mockMvc.perform(post("/login")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(loginDTO)))
                .andExpect(status().isOk())
                .andExpect(content().string("/projectName"));
    }

    @Test
    public void login_whenUsernameNotFoundException_returnsNotFoundWithError() throws Exception {
        LoginDTO loginDTO = new LoginDTO();
        loginDTO.setName("someName");
        loginDTO.setPassword("somePassword");

        when(mockAuthenticationManager.authenticate(any(UsernamePasswordAuthenticationToken.class)))
                .thenThrow(new UsernameNotFoundException("Keeaa!? That’s not your project name."));

        mockMvc.perform(post("/login")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(loginDTO)))
                .andExpect(status().isNotFound())
                .andExpect(jsonPath("$.message", equalTo(null)))
                .andExpect(jsonPath("$.fieldErrors.name", equalTo("Keeaa!? That’s not your project name.")));
    }

    @Test
    public void login_whenBadCredentialsException_returnsUnauthorizedWithError() throws Exception {
        LoginDTO loginDTO = new LoginDTO();
        loginDTO.setName("someName");
        loginDTO.setPassword("somePassword");

        when(mockAuthenticationManager.authenticate(any(UsernamePasswordAuthenticationToken.class)))
                .thenThrow(new BadCredentialsException("They bad."));

        mockMvc.perform(post("/login")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(loginDTO)))
                .andExpect(status().isUnauthorized())
                .andExpect(jsonPath("$.message", equalTo(null)))
                .andExpect(jsonPath("$.fieldErrors.password", equalTo("Polly want a cracker? Try another password.")));
    }

    @Test
    public void login_whenAuthenticationFails_returnsInternalServerErrorWithError() throws Exception {
        LoginDTO loginDTO = new LoginDTO();
        loginDTO.setName("someName");
        loginDTO.setPassword("somePassword");

        Authentication authentication = mock(Authentication.class);
        when(authentication.isAuthenticated()).thenReturn(false);
        when(mockAuthenticationManager.authenticate(any(UsernamePasswordAuthenticationToken.class)))
                .thenReturn(authentication);

        mockMvc.perform(post("/login")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(loginDTO)))
                .andExpect(status().isInternalServerError())
                .andExpect(jsonPath("$.message", equalTo("Unknown Error.")))
                .andExpect(jsonPath("$.fieldErrors", equalTo(null)));
    }

    @Test
    public void login_whenUsernameIsEmpty_returnsError() throws Exception {
        LoginDTO loginDTO = new LoginDTO();
        loginDTO.setName("");
        loginDTO.setPassword("somePassword");

        mockMvc.perform(post("/login")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(loginDTO)))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.message", equalTo(null)))
                .andExpect(jsonPath("$.fieldErrors.name", equalTo("Keeaa!? That’s not your project name.")));
    }

    @Test
    public void login_whenUsernameIsNull_returnsError() throws Exception {
        LoginDTO loginDTO = new LoginDTO();
        loginDTO.setName(null);
        loginDTO.setPassword("somePassword");

        mockMvc.perform(post("/login")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(loginDTO)))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.message", equalTo(null)))
                .andExpect(jsonPath("$.fieldErrors.name", equalTo("Keeaa!? That’s not your project name.")));
    }

    @Test
    public void login_whenPasswordIsEmpty_returnsError() throws Exception {
        LoginDTO loginDTO = new LoginDTO();
        loginDTO.setName("someName");
        loginDTO.setPassword("");

        mockMvc.perform(post("/login")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(loginDTO)))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.message", equalTo(null)))
                .andExpect(jsonPath("$.fieldErrors.password", equalTo("Polly want a cracker? Try another password.")));
    }

    @Test
    public void login_whenPasswordIsNull_returnsError() throws Exception {
        LoginDTO loginDTO = new LoginDTO();
        loginDTO.setName("someName");
        loginDTO.setPassword(null);

        mockMvc.perform(post("/login")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(loginDTO)))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.message", equalTo(null)))
                .andExpect(jsonPath("$.fieldErrors.password", equalTo("Polly want a cracker? Try another password.")));
    }

    @Test
    public void login_whenBothUsernameAndPasswordAreInvalid_returnsError() throws Exception {
        LoginDTO loginDTO = new LoginDTO();
        loginDTO.setName("");
        loginDTO.setPassword("");

        mockMvc.perform(post("/login")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(loginDTO)))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.message", equalTo(null)))
                .andExpect(jsonPath("$.fieldErrors.name", equalTo("Keeaa!? That’s not your project name.")))
                .andExpect(jsonPath("$.fieldErrors.password", equalTo("Polly want a cracker? Try another password.")));
    }

}