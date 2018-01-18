package com.parrit.controllers;

import com.parrit.entities.PairingBoard;
import com.parrit.entities.PairingHistory;
import com.parrit.entities.Project;
import com.parrit.services.PairingService;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;

import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.Matchers.equalTo;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@RunWith(SpringRunner.class)
@WebMvcTest(controllers = PairingController.class, secure = false)
public class PairingControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private PairingService mockPairingService;

    private Project exampleProject;
    private String exampleProjectString;

    @Before
    public void setUp() {
        PairingBoard pairingBoard = new PairingBoard("Super Pairing Board", false, new ArrayList<>(), new ArrayList<>());
        pairingBoard.setId(1L);

        exampleProject = new Project("Nancy", "nancypass", Collections.singletonList(pairingBoard), new ArrayList<>());
        exampleProject.setId(2L);

        String pairingBoardString = "{\"id\":1,\"name\":\"Super Pairing Board\",\"exempt\":false,\"people\":[],\"roles\":[]}";
        exampleProjectString = "{\"id\":2,\"name\":\"Nancy\",\"pairingBoards\":[" + pairingBoardString + "],\"people\":[]}";
    }

    //********************//
    //******  APIs  ******//
    //********************//

    @Test
    public void savePairing_passesTheProjectToThePairingHistoryService_andReturnsTheResultingPairingHistories() throws Exception {
        PairingHistory pairingHistory1 = new PairingHistory(exampleProject, "Pairing Board 1", new ArrayList<>(), new Timestamp(120000));
        PairingHistory pairingHistory2 = new PairingHistory(exampleProject, "Pairing Board 2", new ArrayList<>(), new Timestamp(60000));
        PairingHistory pairingHistory3 = new PairingHistory(exampleProject, "Pairing Board 3", new ArrayList<>(), new Timestamp(60000));

        when(mockPairingService.savePairing(anyLong())).thenReturn(Arrays.asList(pairingHistory1, pairingHistory2, pairingHistory3));

        MvcResult mvcResult = mockMvc.perform(post("/api/project/42/pairing"))
                .andExpect(status().isOk())
                .andReturn();

        String expectedResult = "[" +
                "{\"pairingBoardName\":\"Pairing Board 1\",\"people\":[],\"pairingTime\":\"1970-01-01T00:02:00.000+0000\"}," +
                "{\"pairingBoardName\":\"Pairing Board 2\",\"people\":[],\"pairingTime\":\"1970-01-01T00:01:00.000+0000\"}," +
                "{\"pairingBoardName\":\"Pairing Board 3\",\"people\":[],\"pairingTime\":\"1970-01-01T00:01:00.000+0000\"}" +
            "]";

        String returnedProject = mvcResult.getResponse().getContentAsString();
        assertThat(returnedProject, equalTo(expectedResult));

        verify(mockPairingService).savePairing(42);
    }

    @Test
    public void getRecommendation_passesTheProjectToThePairingService_andReturnsAModifiedProject() throws Exception {
        when(mockPairingService.getRecommendation(anyLong())).thenReturn(exampleProject);

        MvcResult mvcResult = mockMvc.perform(get("/api/project/42/pairing/recommend")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andReturn();

        String returnedProject = mvcResult.getResponse().getContentAsString();
        assertThat(returnedProject, equalTo(exampleProjectString));

        verify(mockPairingService).getRecommendation(42);
    }

    @Test
    public void getPairingHistory_callsPairingHistoryService_andReturnsAMapOfTimestampsToListsOfPairHistories() throws Exception {
        PairingHistory pairingHistory1 = new PairingHistory(exampleProject, "Pairing Board 1", new ArrayList<>(), new Timestamp(120000));
        PairingHistory pairingHistory2 = new PairingHistory(exampleProject, "Pairing Board 2", new ArrayList<>(), new Timestamp(60000));
        PairingHistory pairingHistory3 = new PairingHistory(exampleProject, "Pairing Board 3", new ArrayList<>(), new Timestamp(60000));

        when(mockPairingService.getSortedPairingHistory(anyLong())).thenReturn(Arrays.asList(pairingHistory1, pairingHistory2, pairingHistory3));

        MvcResult mvcResult = mockMvc.perform(get("/api/project/42/pairing/history")
            .contentType(MediaType.APPLICATION_JSON))
            .andExpect(status().isOk())
            .andReturn();

        String expectedResult = "[" +
                "{\"pairingBoardName\":\"Pairing Board 1\",\"people\":[],\"pairingTime\":\"1970-01-01T00:02:00.000+0000\"}," +
                "{\"pairingBoardName\":\"Pairing Board 2\",\"people\":[],\"pairingTime\":\"1970-01-01T00:01:00.000+0000\"}," +
                "{\"pairingBoardName\":\"Pairing Board 3\",\"people\":[],\"pairingTime\":\"1970-01-01T00:01:00.000+0000\"}" +
            "]";

        String returnedProject = mvcResult.getResponse().getContentAsString();
        assertThat(returnedProject, equalTo(expectedResult));

        verify(mockPairingService).getSortedPairingHistory(42);
    }
}
