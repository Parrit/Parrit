package com.parrit.controllers;

import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.Matchers.equalTo;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import com.parrit.entities.*;
import com.parrit.services.PairingService;
import com.parrit.support.ControllerTestBase;
import org.junit.Before;
import org.junit.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MvcResult;

import java.util.ArrayList;
import java.util.Collections;

public class PairingControllerTest extends ControllerTestBase {

    @Mock
    PairingService mockPairingService;

    @Autowired
    @InjectMocks
    PairingController pairingController;

    Workspace exampleWorkspace;
    String exampleWorkspaceString;

    @Before
    public void setUp() {
        Space space1 = new Space(1L, new ArrayList<>(), "Super Space");
        exampleWorkspace = new Workspace(2L, "Nancy", Collections.singletonList(space1), new ArrayList<>());

        String space1String = "{\"id\":1,\"people\":[],\"name\":\"Super Space\"}";
        exampleWorkspaceString = "{\"id\":2,\"name\":\"Nancy\",\"spaces\":[" + space1String + "],\"people\":[]}";
    }

    //********************//
    //******  APIs  ******//
    //********************//

    @Test
    public void savePairing_passesTheWorkspaceToThePairingHistoryService() throws Exception {
        mvc.perform(post("/api/workspace/42/pairing")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk());

        verify(mockPairingService).savePairing(42);
    }

    @Test
    public void getRecommendation_passesTheWorkspaceToThePairingService_andReturnsAModifiedWorkspace() throws Exception {
        when(mockPairingService.getRecommendation(anyLong())).thenReturn(exampleWorkspace);

        MvcResult mvcResult = mvc.perform(get("/api/workspace/42/pairing/recommend")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andReturn();

        String returnedState = mvcResult.getResponse().getContentAsString();
        assertThat(returnedState, equalTo(exampleWorkspaceString));

        verify(mockPairingService).getRecommendation(42);
    }
}
