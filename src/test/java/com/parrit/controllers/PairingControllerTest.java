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

    Project exampleProject;
    String exampleProjectString;

    @Before
    public void setUp() {
        PairingBoard pairingBoard = new PairingBoard("Super Pairing Board", new ArrayList<>());
        pairingBoard.setId(1L);

        exampleProject = new Project("Nancy", "nancypass", Collections.singletonList(pairingBoard), new ArrayList<>());
        exampleProject.setId(2L);

        String pairingBoardString = "{\"id\":1,\"people\":[],\"name\":\"Super Pairing Board\"}";
        exampleProjectString = "{\"id\":2,\"name\":\"Nancy\",\"pairingBoards\":[" + pairingBoardString + "],\"people\":[]}";
    }

    //********************//
    //******  APIs  ******//
    //********************//

    @Test
    public void savePairing_passesTheProjectToThePairingHistoryService() throws Exception {
        mvc.perform(post("/api/project/42/pairing")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk());

        verify(mockPairingService).savePairing(42);
    }

    @Test
    public void getRecommendation_passesTheProjectToThePairingService_andReturnsAModifiedProject() throws Exception {
        when(mockPairingService.getRecommendation(anyLong())).thenReturn(exampleProject);

        MvcResult mvcResult = mvc.perform(get("/api/project/42/pairing/recommend")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andReturn();

        String returnedProject = mvcResult.getResponse().getContentAsString();
        assertThat(returnedProject, equalTo(exampleProjectString));

        verify(mockPairingService).getRecommendation(42);
    }
}
