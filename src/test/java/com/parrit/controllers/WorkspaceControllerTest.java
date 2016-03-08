package com.parrit.controllers;

import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.Matchers.equalTo;
import static org.mockito.Matchers.any;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

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

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

public class WorkspaceControllerTest extends ControllerTestBase {

    @Mock
    WorkspaceRepository mockWorkspaceRepository;

    @Autowired
    @InjectMocks
    WorkspaceController workspaceController;

    Workspace exampleWorkspace;
    String exampleWorkspaceString;
    List<String> workspaceNames;

    @Before
    public void setUp() {
        exampleWorkspace = new Workspace(1L, "Henry", "henrypass", new ArrayList<>(), new ArrayList<>());

        exampleWorkspaceString = "{\"id\":1,\"name\":\"Henry\",\"spaces\":[],\"people\":[]}";

        workspaceNames = Arrays.asList("Henry", "Nancy");
    }

    //*********************//
    //******  Views  ******//
    //*********************//

    @Test
    public void getDashboard_returnsDashboardView() throws Exception {
        mvc.perform(get("/"))
            .andExpect(status().isOk())
            .andExpect(view().name("dashboard"));
    }

    @Test
    public void getWorkspace_returnsResultFromRepository() throws Exception {
        when(mockWorkspaceRepository.findByName("workspaceName")).thenReturn(exampleWorkspace);

        mvc.perform(get("/workspaceName"))
            .andExpect(status().isOk())
            .andExpect(view().name("workspace"))
            .andExpect(model().attribute("workspace", exampleWorkspace));

        verify(mockWorkspaceRepository, never()).save(any(Workspace.class));
        verify(mockWorkspaceRepository).findByName("workspaceName");
    }

    //********************//
    //******  APIs  ******//
    //********************//

    @Test
    public void createWorkspace_savesTheNewWorkspace_andReturnsListOfAllWorkspaceNames() throws Exception {
        when(mockWorkspaceRepository.getAllWorkspaceNames()).thenReturn(workspaceNames);
        when(mockWorkspaceRepository.save(any(Workspace.class))).thenReturn(exampleWorkspace);

        MvcResult mvcResult = mvc.perform(post("/api/workspace/new")
            .contentType(MediaType.APPLICATION_JSON)
            .content("{\"name\":\"bob\",\"password\":\"bobpass\"}"))
            .andExpect(status().isOk())
            .andReturn();

        String returnedNames = mvcResult.getResponse().getContentAsString();
        assertThat(returnedNames, equalTo("[\"Henry\",\"Nancy\"]"));

        Workspace newWorkspace = new Workspace("bob", "da7655b5bf67039c3e76a99d8e6fb6969370bbc0fa440cae699cf1a3e2f1e0a1", new ArrayList<>(), new ArrayList<>());

        verify(mockWorkspaceRepository).save(eq(newWorkspace));
        verify(mockWorkspaceRepository).getAllWorkspaceNames();
    }

    @Test
    public void saveWorkspace_persistsTheWorkspace_andReturnsTheResult() throws Exception {
        when(mockWorkspaceRepository.save(any(Workspace.class))).thenReturn(exampleWorkspace);

        MvcResult mvcResult = mvc.perform(post("/api/workspace")
            .contentType(MediaType.APPLICATION_JSON)
            .content(exampleWorkspaceString))
            .andExpect(status().isOk())
            .andReturn();

        String returnedState = mvcResult.getResponse().getContentAsString();
        assertThat(returnedState, equalTo(exampleWorkspaceString));

        verify(mockWorkspaceRepository).save(any(Workspace.class));
    }
}
