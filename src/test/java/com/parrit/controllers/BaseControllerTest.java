package com.parrit.controllers;

import com.parrit.configurations.AuthorizationService;
import org.junit.jupiter.api.BeforeEach;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.test.context.support.WithMockUser;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.Mockito.when;

@WithMockUser
public class BaseControllerTest {

    @MockBean
    private UserDetailsService userDetailsService;

    @MockBean(name = "authorizationService")
    private AuthorizationService authorizationService;

    @BeforeEach
    void setup() {
        when(authorizationService.canAccessProject(any(), anyLong())).thenReturn(true);
        when(authorizationService.canAccessProject(any(), any())).thenReturn(true);
    }
}
