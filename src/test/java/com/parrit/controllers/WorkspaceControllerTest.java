package com.parrit.controllers;

import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.Matchers.equalTo;
import static org.mockito.Matchers.any;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.model;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.view;

import com.parrit.entities.*;
import com.parrit.repositories.*;
import com.parrit.support.ControllerTestBase;
import org.junit.Before;
import org.junit.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;

import org.springframework.test.web.servlet.MvcResult;

import java.util.Arrays;
import java.util.List;

public class WorkspaceControllerTest extends ControllerTestBase {

    @Mock
    WorkspaceRepository mockWorkspaceRepository;

    @Autowired
    @InjectMocks
    WorkspaceController workspaceController;

    Workspace exampleWorkspace1;
    Workspace exampleWorkspace2;
    String exampleWorkspace1String;

    @Before
    public void setUp() {
        exampleWorkspace1 = new Workspace();
        exampleWorkspace1.setId(1L);
        exampleWorkspace1.setName("Henry");

        exampleWorkspace2 = new Workspace();
        exampleWorkspace2.setId(2L);
        exampleWorkspace2.setName("Nancy");

        exampleWorkspace1String = "{\"id\":1,\"name\":\"Henry\",\"spaces\":null,\"people\":null}";
    }

    //*********************//
    //******  Views  ******//
    //*********************//

    @Test
    public void getWorkspaceNames_returnsAllWorkspaceNames() throws Exception {
        when(mockWorkspaceRepository.findAll()).thenReturn(Arrays.asList(exampleWorkspace1, exampleWorkspace2));

        mvc.perform(get("/"))
                .andExpect(status().isOk())
                .andExpect(view().name("dashboard"))
                .andExpect(model().attribute("workspaceNames", Arrays.asList("Henry", "Nancy")));

        verify(mockWorkspaceRepository).findAll();
    }

    @Test
    public void getWorkspace_returnsResultFromRepository() throws Exception {
        when(mockWorkspaceRepository.findByName("workspaceName")).thenReturn(exampleWorkspace1);

        mvc.perform(get("/workspaceName"))
                .andExpect(status().isOk())
                .andExpect(view().name("workspace"))
                .andExpect(model().attribute("workspace", exampleWorkspace1));

        verify(mockWorkspaceRepository, never()).save(any(Workspace.class));
        verify(mockWorkspaceRepository).findByName("workspaceName");
    }

    //********************//
    //******  APIs  ******//
    //********************//

    @Test
    public void saveWorkspace_persistsTheWorkspace_andReturnsTheResult() throws Exception {
        when(mockWorkspaceRepository.save(any(Workspace.class))).thenReturn(exampleWorkspace1);

        MvcResult mvcResult = mvc.perform(post("/api/workspace")
                .contentType(MediaType.APPLICATION_JSON)
                .content(exampleWorkspace1String))
                .andExpect(status().isOk())
                .andReturn();

        String returnedState = mvcResult.getResponse().getContentAsString();
        assertThat(returnedState, equalTo(exampleWorkspace1String));

        verify(mockWorkspaceRepository).save(any(Workspace.class));
    }
}
