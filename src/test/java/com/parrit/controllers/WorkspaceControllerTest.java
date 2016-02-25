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
import com.parrit.services.PairingHistoryService;
import com.parrit.support.ControllerTestBase;
import org.junit.Before;
import org.junit.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;

import org.springframework.test.web.servlet.MvcResult;

import java.util.Arrays;
import java.util.Collections;
import java.util.List;

public class WorkspaceControllerTest extends ControllerTestBase {

    @Mock
    WorkspaceRepository mockWorkspaceRepository;

    @Mock
    PairingHistoryService mockPairingHistoryService;

    @Autowired
    @InjectMocks
    WorkspaceController workspaceController;

    Workspace exampleWorkspace1;
    Workspace exampleWorkspace2;
    String exampleWorkspace1String;
    String exampleWorkspace2String;
    List<String> workspaceNames;

    @Before
    public void setUp() {
        exampleWorkspace1 = new Workspace();
        exampleWorkspace1.setId(1L);
        exampleWorkspace1.setName("Henry");

        exampleWorkspace2 = new Workspace();
        exampleWorkspace2.setId(2L);
        exampleWorkspace2.setName("Nancy");

        Space space1 = new Space();
        space1.setId(1L);
        space1.setName("Super Space");
        exampleWorkspace2.setSpaces(Collections.singletonList(space1));

        exampleWorkspace1String = "{\"id\":1,\"name\":\"Henry\",\"spaces\":null,\"people\":null}";
        String space1String = "{\"id\":1,\"name\":\"Super Space\",\"people\":null}";
        exampleWorkspace2String = "{\"id\":2,\"name\":\"Nancy\",\"spaces\":[" + space1String + "],\"people\":null}";

        workspaceNames = Arrays.asList("Henry", "Nancy");
    }

    //*********************//
    //******  Views  ******//
    //*********************//

    @Test
    public void getWorkspaceNames_returnsAllWorkspaceNames() throws Exception {
        when(mockWorkspaceRepository.getAllWorkspaceNames()).thenReturn(workspaceNames);

        mvc.perform(get("/"))
                .andExpect(status().isOk())
                .andExpect(view().name("dashboard"))
                .andExpect(model().attribute("workspaceNames", workspaceNames));

        verify(mockWorkspaceRepository).getAllWorkspaceNames();
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

    @Test
    public void createWorkspace_savesTheNewWorkspaceName_andReturnsListOfAllWorkspaceNames() throws Exception {
        when(mockWorkspaceRepository.getAllWorkspaceNames()).thenReturn(workspaceNames);
        when(mockWorkspaceRepository.save(any(Workspace.class))).thenReturn(exampleWorkspace1);

        MvcResult mvcResult = mvc.perform(post("/api/workspace/new")
                .contentType(MediaType.APPLICATION_JSON)
                .content("Bob"))
                .andExpect(status().isOk())
                .andReturn();

        String returnedNames = mvcResult.getResponse().getContentAsString();
        assertThat(returnedNames, equalTo("[\"Henry\",\"Nancy\"]"));

        Workspace newWorkspace = new Workspace();
        newWorkspace.setName("Bob");

        verify(mockWorkspaceRepository).save(eq(newWorkspace));
        verify(mockWorkspaceRepository).getAllWorkspaceNames();
    }

    @Test
    public void savePairing_passesTheListOfSpacesToThePairingHistoryService() throws Exception {
        mvc.perform(post("/api/workspace/pairing")
                .contentType(MediaType.APPLICATION_JSON)
                .content(exampleWorkspace2String))
                .andExpect(status().isOk())
                .andReturn();

        verify(mockPairingHistoryService).savePairing(eq(exampleWorkspace2));
    }
}
