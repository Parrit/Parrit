package com.parrit.controllers;

import com.parrit.DTOs.WorkspaceDTO;
import com.parrit.entities.Workspace;
import com.parrit.repositories.WorkspaceRepository;
import com.parrit.support.ControllerTestBase;
import com.parrit.transformers.WorkspaceTransformer;
import org.junit.Before;
import org.junit.Rule;
import org.junit.Test;
import org.junit.rules.ExpectedException;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.web.util.NestedServletException;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.Matchers.equalTo;
import static org.mockito.Matchers.any;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

public class WorkspaceControllerTest extends ControllerTestBase {

    @Mock
    WorkspaceRepository mockWorkspaceRepository;

    @Autowired
    @InjectMocks
    WorkspaceController workspaceController;

    Workspace persistedWorkspace;
    Workspace updatedWorkspace;
    WorkspaceDTO updatedWorkspaceDTO;
    String persistedWorkspaceString;
    String updatedWorkspaceDTOString;
    List<String> workspaceNames;

    @Rule
    public ExpectedException thrown = ExpectedException.none();

    @Before
    public void setUp() {
        persistedWorkspace = new Workspace("Henry", "henrypass", new ArrayList<>(), new ArrayList<>());
        persistedWorkspace.setId(1L);
        persistedWorkspaceString = "{\"id\":1,\"name\":\"Henry\",\"password\":\"henrypass\",\"spaces\":[],\"people\":[]}";

        updatedWorkspaceDTO = WorkspaceTransformer.transform(persistedWorkspace);
        updatedWorkspaceDTOString = "{\"id\":1,\"name\":\"Bob\",\"spaces\":[],\"people\":[]}";

        updatedWorkspace = new Workspace("Bob", "henrypass", new ArrayList<>(), new ArrayList<>());
        updatedWorkspace.setId(1L);

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
        when(mockWorkspaceRepository.findByName("workspaceName")).thenReturn(persistedWorkspace);

        mvc.perform(get("/workspaceName"))
            .andExpect(status().isOk())
            .andExpect(view().name("workspace"))
            .andExpect(model().attribute("workspace", updatedWorkspaceDTO));

        verify(mockWorkspaceRepository, never()).save(any(Workspace.class));
        verify(mockWorkspaceRepository).findByName("workspaceName");
    }

    //********************//
    //******  APIs  ******//
    //********************//

    @Test
    public void createWorkspace_savesTheNewWorkspace_andReturnsListOfAllWorkspaceNames() throws Exception {
        when(mockWorkspaceRepository.save(any(Workspace.class))).thenReturn(persistedWorkspace);

        mvc.perform(post("/api/workspace/new")
            .contentType(MediaType.APPLICATION_JSON)
            .content("{\"name\":\"bob\",\"password\":\"bobpass\"}"))
            .andExpect(status().isOk());

        Workspace newWorkspace = new Workspace("bob", "da7655b5bf67039c3e76a99d8e6fb6969370bbc0fa440cae699cf1a3e2f1e0a1", new ArrayList<>(), new ArrayList<>());

        verify(mockWorkspaceRepository).save(eq(newWorkspace));
    }

    @Test
    public void createWorkspace_throwsAnException_whenTheWorkspaceNameIsEmpty() throws Exception {
        thrown.expect(NestedServletException.class);

        mvc.perform(post("/api/workspace/new")
            .contentType(MediaType.APPLICATION_JSON)
            .content("{\"name\":\"\",\"password\":\"bobpass\"}"));
    }

    @Test
    public void createWorkspace_throwsAnException_whenThePasswordIsEmpty() throws Exception {
        thrown.expect(NestedServletException.class);

        mvc.perform(post("/api/workspace/new")
            .contentType(MediaType.APPLICATION_JSON)
            .content("{\"name\":\"bob\",\"password\":\"\"}"));
    }

    @Test
    public void saveWorkspace_persistsTheWorkspaceWithChanges_andReturnsTheResult() throws Exception {
        when(mockWorkspaceRepository.findOne(anyLong())).thenReturn(persistedWorkspace);
        when(mockWorkspaceRepository.save(any(Workspace.class))).thenReturn(updatedWorkspace);

        MvcResult mvcResult = mvc.perform(post("/api/workspace")
            .contentType(MediaType.APPLICATION_JSON)
            .content(updatedWorkspaceDTOString))
            .andExpect(status().isOk())
            .andReturn();

        String returnedState = mvcResult.getResponse().getContentAsString();
        assertThat(returnedState, equalTo(updatedWorkspaceDTOString));

        verify(mockWorkspaceRepository).findOne(1L);
        verify(mockWorkspaceRepository).save(eq(updatedWorkspace));
    }
}
