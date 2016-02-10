package com.test.parrit.controllers;

import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.Matchers.equalTo;
import static org.mockito.Matchers.any;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import com.parrit.controllers.WorkspaceController;
import com.parrit.entities.*;
import com.parrit.repositories.*;
import com.test.parrit.support.ControllerTestBase;
import org.junit.Before;
import org.junit.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;

import org.springframework.test.web.servlet.MvcResult;

public class WorkspaceControllerTest extends ControllerTestBase {

    @Mock
    WorkspaceRepository mockWorkspaceRepository;

    @Autowired
    @InjectMocks
    WorkspaceController workspaceController;

    String exampleWorkspaceString;
    Workspace exampleWorkspace;

    @Before
    public void setUp() {
        exampleWorkspaceString = "{\"id\":1,\"spaces\":null,\"people\":null}";

        exampleWorkspace = new Workspace();
        exampleWorkspace.setId(1L);
    }

    @Test
    public void save_persistsTheWorkspace_andReturnsTheResult() throws Exception {
        when(mockWorkspaceRepository.save(any(Workspace.class))).thenReturn(exampleWorkspace);

        MvcResult mvcResult = mvc.perform(post("/workspace")
                .contentType(MediaType.APPLICATION_JSON)
                .content(exampleWorkspaceString))
                .andExpect(status().isOk())
                .andReturn();

        String returnedState = mvcResult.getResponse().getContentAsString();
        assertThat(returnedState, equalTo(exampleWorkspaceString));

        verify(mockWorkspaceRepository).save(any(Workspace.class));
    }

    @Test
    public void get_returnsResultFromRepository() throws Exception {
        when(mockWorkspaceRepository.findOne(anyLong())).thenReturn(exampleWorkspace);

        MvcResult mvcResult = mvc.perform(get("/workspace")
                .param("id", "1"))
                .andExpect(status().isOk())
                .andReturn();

        String returnedState = mvcResult.getResponse().getContentAsString();
        assertThat(returnedState, equalTo(exampleWorkspaceString));

        verify(mockWorkspaceRepository, never()).save(any(Workspace.class));
        verify(mockWorkspaceRepository).findOne(1L);
    }
}
