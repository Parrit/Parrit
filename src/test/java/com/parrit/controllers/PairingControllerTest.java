package com.parrit.controllers;

import com.parrit.entities.PairingArrangement;
import com.parrit.entities.PairingBoard;
import com.parrit.entities.PairingHistory;
import com.parrit.entities.Project;
import com.parrit.repositories.ProjectRepository;
import com.parrit.services.PairingService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.ArgumentCaptor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import java.sql.Timestamp;
import java.util.*;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(controllers = PairingController.class)
@AutoConfigureMockMvc(addFilters = false)
public class PairingControllerTest extends BaseControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private PairingService mockPairingService;

    @MockBean
    private ProjectRepository mockProjectRepository;

    private Project exampleProject;
    private String exampleProjectString;

    @BeforeEach
    public void setUp() {
        PairingBoard pairingBoard = new PairingBoard("Super Pairing Board", false, new ArrayList<>(), new ArrayList<>());
        pairingBoard.setId(1L);

        exampleProject = new Project("Nancy", "nancypass", Collections.singletonList(pairingBoard), new ArrayList<>(), List.of());
        exampleProject.setId(2L);

        String pairingBoardString = "{\"id\":1,\"name\":\"Super Pairing Board\",\"exempt\":false,\"people\":[],\"roles\":[]}";
        exampleProjectString = "{\"id\":2,\"name\":\"Nancy\",\"pairingBoards\":[" + pairingBoardString + "],\"people\":[]}";
    }

    //********************//
    //******  APIs  ******//
    //********************//

    @Test
    public void savePairing_passesTheProjectToThePairingHistoryService_andReturnsTheResultingPairingHistories() throws Exception {
        PairingHistory pairingHistory1 = new PairingHistory(null, "Pairing Board 1", new ArrayList<>(), null);
        PairingHistory pairingHistory2 = new PairingHistory(null, "Pairing Board 2", new ArrayList<>(), null);
        PairingHistory pairingHistory3 = new PairingHistory(null, "Pairing Board 3", new ArrayList<>(), null);

        PairingArrangement pairingArrangement1 = PairingArrangement.builder()
                .id(1L)
                .pairingHistories(Set.of(pairingHistory1))
                .project(exampleProject)
                .pairingTime(new Timestamp(120000))
                .build();
        PairingArrangement pairingArrangement2 = PairingArrangement.builder()
                .id(2L)
                .pairingHistories(Set.of(pairingHistory2, pairingHistory3))
                .project(exampleProject)
                .pairingTime(new Timestamp(60000))
                .build();

        when(mockProjectRepository.findById(anyLong())).thenReturn(Optional.of(exampleProject));
        when(mockPairingService.getSortedPairingHistory(exampleProject)).thenReturn(List.of(pairingArrangement1, pairingArrangement2));

        String expectedResult = "[{" +
                "   \"id\": 1," +
                "    \"pairingHistories\": [{\"pairingBoardName\": \"Pairing Board 1\", \"people\": []}]," +
                "    \"pairingTime\": \"1970-01-01T00:02:00.000+0000\"" +
                "  }," +
                "  {" +
                "   \"id\": 2," +
                "    \"pairingHistories\": [{\"pairingBoardName\": \"Pairing Board 2\", \"people\": []}, {\"pairingBoardName\": \"Pairing Board 3\", \"people\": []}]," +
                "    \"pairingTime\": \"1970-01-01T00:01:00.000+0000\"" +
                "  }]";

        mockMvc.perform(post("/api/project/42/pairing"))
                .andExpect(status().isOk())
                .andExpect(content().json(expectedResult));

        verify(mockProjectRepository).findById(42L);
        verify(mockPairingService).savePairing(exampleProject);
    }

    @Test
    public void getPairingHistory_callsPairingHistoryService_andReturnsPairingArrangements() throws Exception {
        PairingHistory pairingHistory1 = new PairingHistory(null, "Pairing Board 1", new ArrayList<>(), null);
        PairingHistory pairingHistory2 = new PairingHistory(null, "Pairing Board 2", new ArrayList<>(), null);
        PairingHistory pairingHistory3 = new PairingHistory(null, "Pairing Board 3", new ArrayList<>(), null);

        PairingArrangement pairingArrangement1 = PairingArrangement.builder()
                .id(1L)
                .pairingHistories(Set.of(pairingHistory1))
                .project(exampleProject)
                .pairingTime(new Timestamp(120000))
                .build();
        PairingArrangement pairingArrangement2 = PairingArrangement.builder()
                .id(2L)
                .pairingHistories(Set.of(pairingHistory2, pairingHistory3))
                .project(exampleProject)
                .pairingTime(new Timestamp(60000))
                .build();
        when(mockProjectRepository.findById(anyLong())).thenReturn(Optional.of(exampleProject));
        when(mockPairingService.getSortedPairingHistory(exampleProject)).thenReturn(List.of(pairingArrangement1, pairingArrangement2));

        String expectedResult =
                "[" +
                        "  {" +
                        "   \"id\": 1," +
                        "    \"pairingHistories\": [{\"pairingBoardName\": \"Pairing Board 1\", \"people\": []}]," +
                        "    \"pairingTime\": \"1970-01-01T00:02:00.000+0000\"" +
                        "  }," +
                        "  {" +
                        "   \"id\": 2," +
                        "    \"pairingHistories\": [{\"pairingBoardName\": \"Pairing Board 2\", \"people\": []}, {\"pairingBoardName\": \"Pairing Board 3\", \"people\": []}]," +
                        "    \"pairingTime\": \"1970-01-01T00:01:00.000+0000\"" +
                        "  }" +
                        "]";

        mockMvc.perform(get("/api/project/42/pairing/history")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(content().json(expectedResult));

        verify(mockProjectRepository).findById(42L);
        verify(mockPairingService).getSortedPairingHistory(exampleProject);
    }

    @Test
    public void deletePairingArrangement_deletesPairingArrangementByProjectAndId_andReturnPairingArrangement() throws Exception {
        PairingHistory pairingHistory1 = new PairingHistory(null, "Pairing Board 1", new ArrayList<>(), null);
        PairingArrangement pairingArrangement1 = PairingArrangement.builder()
                .id(1L)
                .pairingHistories(Set.of(pairingHistory1))
                .project(exampleProject)
                .pairingTime(new Timestamp(120000))
                .build();
        exampleProject.setPairingArrangements(new ArrayList<>(List.of(pairingArrangement1)));

        when(mockProjectRepository.findById(anyLong())).thenReturn(Optional.of(exampleProject));
        when(mockPairingService.getSortedPairingHistory(exampleProject)).thenReturn(List.of(pairingArrangement1));

        String expectedResult =
                "[" +
                        "  {" +
                        "   \"id\": 1," +
                        "    \"pairingHistories\": [{\"pairingBoardName\": \"Pairing Board 1\", \"people\": []}]," +
                        "    \"pairingTime\": \"1970-01-01T00:02:00.000+0000\"" +
                        "  }" +
                        "]";

        mockMvc.perform(delete("/api/project/42/pairing/history/1")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(content().json(expectedResult));

        ArgumentCaptor<Project> projectArgumentCaptor = ArgumentCaptor.forClass(Project.class);
        verify(mockProjectRepository).save(projectArgumentCaptor.capture());
        Project updatedProject = projectArgumentCaptor.getValue();
        assertThat(updatedProject.getPairingArrangements()).doesNotContain(pairingArrangement1);
    }
}
