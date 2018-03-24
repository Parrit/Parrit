package com.parrit.controllers;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.parrit.DTOs.PairingBoardDTO;
import com.parrit.DTOs.ProjectDTO;
import com.parrit.entities.PairingBoard;
import com.parrit.entities.Person;
import com.parrit.entities.Project;
import com.parrit.repositories.PairingBoardRepository;
import com.parrit.repositories.ProjectRepository;
import com.parrit.transformers.PairingBoardTransformer;
import com.parrit.transformers.ProjectTransformer;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;

import java.util.ArrayList;
import java.util.Collections;
import java.util.Optional;

import static org.hamcrest.Matchers.equalTo;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@RunWith(SpringRunner.class)
@WebMvcTest(controllers = PairingBoardController.class, secure = false)
public class PairingBoardControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @MockBean
    private ProjectRepository mockProjectRepository;

    @MockBean
    private PairingBoardRepository mockParingBoardRepository;

    @Test
    public void addPairingBoard_createsAPairingBoardWithTheGivenName_andReturnsTheUpdatedProject() throws Exception {
        Project existingProject = new Project("Henry", "henrypass", new ArrayList<>(), new ArrayList<>());
        existingProject.setId(1L);

        PairingBoard newPairingBoard = new PairingBoard("Cool Kids", false, new ArrayList<>(), new ArrayList<>());

        PairingBoardDTO pairingBoardDTO = PairingBoardTransformer.transform(newPairingBoard);

        when(mockProjectRepository.findById(anyLong())).thenReturn(Optional.of(existingProject));
        when(mockProjectRepository.save(any(Project.class))).thenAnswer(i -> i.getArguments()[0]);

        Project expectedProject = new Project("Henry", "henrypass", Collections.singletonList(newPairingBoard), new ArrayList<>());
        expectedProject.setId(1L);

        ProjectDTO updatedProjectDTO = ProjectTransformer.transform(expectedProject);

        mockMvc.perform(post("/api/project/1/pairingBoard")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(pairingBoardDTO)))
                .andExpect(status().isOk())
                .andExpect(content().string(objectMapper.writeValueAsString(updatedProjectDTO)));

        verify(mockProjectRepository).findById(1L);
        verify(mockProjectRepository).save(expectedProject);
    }

    @Test
    public void addPairingBoard_whenNameIsNull_returnsError() throws Exception {
        PairingBoardDTO pairingBoardDTO = new PairingBoardDTO();
        pairingBoardDTO.setName("someNameThatIsGreaterThan32Characters");

        mockMvc.perform(post("/api/project/1/pairingBoard")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(pairingBoardDTO)))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.message", equalTo(null)))
                .andExpect(jsonPath("$.fieldErrors.name", equalTo("Hey! This name needs to be between 1 and 32 characters.")));
    }

    @Test
    public void addPairingBoard_whenNameIsGreaterThan32Characters_returnsError() throws Exception {
        PairingBoardDTO pairingBoardDTO = new PairingBoardDTO();
        pairingBoardDTO.setName(null);

        mockMvc.perform(post("/api/project/1/pairingBoard")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(pairingBoardDTO)))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.message", equalTo(null)))
                .andExpect(jsonPath("$.fieldErrors.name", equalTo("Hey! This name needs to be between 1 and 32 characters.")));
    }

    @Test
    public void updatePairingBoard_updatesMatchingPairingBoardById_andReturnsTheUpdatedProject() throws Exception {
        PairingBoard existingPairingBoard = new PairingBoard("Cool Kids", false, new ArrayList<>(), new ArrayList<>());
        existingPairingBoard.setId(2L);

        Project existingProject = new Project("Henry", "henrypass", Collections.singletonList(existingPairingBoard), new ArrayList<>());
        existingProject.setId(1L);

        PairingBoard updatedPairingBoard = new PairingBoard("Lame Kids", false, new ArrayList<>(), new ArrayList<>());
        updatedPairingBoard.setId(2L);

        PairingBoardDTO updatedPairingBoardDTO = PairingBoardTransformer.transform(updatedPairingBoard);

        when(mockProjectRepository.findById(anyLong())).thenReturn(Optional.of(existingProject));
        when(mockProjectRepository.save(any(Project.class))).thenAnswer(i -> i.getArguments()[0]);

        Project expectedProject = new Project("Henry", "henrypass", Collections.singletonList(updatedPairingBoard), new ArrayList<>());
        expectedProject.setId(1L);

        ProjectDTO updatedProjectDTO = ProjectTransformer.transform(expectedProject);

        mockMvc.perform(put("/api/project/1/pairingBoard/2")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(updatedPairingBoardDTO)))
                .andExpect(status().isOk())
                .andExpect(content().string(objectMapper.writeValueAsString(updatedProjectDTO)));

        verify(mockProjectRepository).findById(1L);
        verify(mockProjectRepository).save(expectedProject);
    }

    @Test
    public void updatePairingBoard_whenNameIsNull_returnsError() throws Exception {
        PairingBoardDTO updatedPairingBoardDTO = new PairingBoardDTO();
        updatedPairingBoardDTO.setName(null);

        mockMvc.perform(put("/api/project/1/pairingBoard/2")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(updatedPairingBoardDTO)))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.message", equalTo(null)))
                .andExpect(jsonPath("$.fieldErrors.name", equalTo("Hey! This name needs to be between 1 and 32 characters.")));
    }

    @Test
    public void updatePairingBoard_whenNameIsGreaterThan32Characters_returnsError() throws Exception {
        PairingBoardDTO updatedPairingBoardDTO = new PairingBoardDTO();
        updatedPairingBoardDTO.setName("someNameThatIsGreaterThan32Characters");

        mockMvc.perform(put("/api/project/1/pairingBoard/2")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(updatedPairingBoardDTO)))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.message", equalTo(null)))
                .andExpect(jsonPath("$.fieldErrors.name", equalTo("Hey! This name needs to be between 1 and 32 characters.")));
    }

    @Test
    public void updatePairingBoard_whenNameNoPairingBoardMatchesGivenId_returnsError() throws Exception {
        PairingBoard existingPairingBoard = new PairingBoard("Cool Kids", false, new ArrayList<>(), new ArrayList<>());
        existingPairingBoard.setId(99L);

        Project existingProject = new Project("Henry", "henrypass", Collections.singletonList(existingPairingBoard), new ArrayList<>());
        existingProject.setId(1L);

        PairingBoardDTO updatedPairingBoardDTO = new PairingBoardDTO();
        updatedPairingBoardDTO.setName("someName");

        when(mockProjectRepository.findById(anyLong())).thenReturn(Optional.of(existingProject));

        mockMvc.perform(put("/api/project/1/pairingBoard/2")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(updatedPairingBoardDTO)))
                .andExpect(status().isNotFound())
                .andExpect(jsonPath("$.message", equalTo(null)))
                .andExpect(jsonPath("$.fieldErrors.id", equalTo("Keeaa!? That pairing board doesn't seem to exist.")));

        verify(mockProjectRepository).findById(1L);
    }

    @Test
    public void deletePairingBoard_removesMatchingPairingBoardFromProject_andReturnsTheUpdatedProject() throws Exception {
        PairingBoard existingPairingBoard = new PairingBoard("Ka-Boom", false, new ArrayList<>(), new ArrayList<>());
        existingPairingBoard.setId(55L);

        Project existingProject = new Project("Henry", "henrypass", new ArrayList<>(Collections.singletonList(existingPairingBoard)), new ArrayList<>());
        existingProject.setId(1L);

        when(mockProjectRepository.findById(anyLong())).thenReturn(Optional.of(existingProject));
        when(mockProjectRepository.save(any(Project.class))).thenAnswer(i -> i.getArguments()[0]);

        Project expectedProject = new Project("Henry", "henrypass", new ArrayList<>(), new ArrayList<>());
        expectedProject.setId(1L);

        ProjectDTO updatedProjectDTO = ProjectTransformer.transform(expectedProject);

        mockMvc.perform(delete("/api/project/1/pairingBoard/55"))
                .andExpect(status().isOk())
                .andExpect(content().string(objectMapper.writeValueAsString(updatedProjectDTO)));

        PairingBoard expectedDeletedPairingBoard = new PairingBoard("Ka-Boom", false, new ArrayList<>(), new ArrayList<>());
        expectedDeletedPairingBoard.setId(55L);

        verify(mockParingBoardRepository).delete(expectedDeletedPairingBoard);
        verify(mockProjectRepository).findById(1L);
        verify(mockProjectRepository).save(expectedProject);
    }

    @Test
    public void deletePairingBoard_movesPeopleFromMatchingPairingBoard_intoFloating() throws Exception {
        Person existingPerson = new Person("Billy");
        existingPerson.setId(99L);

        PairingBoard existingPairingBoard = new PairingBoard("Ka-Boom", false, new ArrayList<>(Collections.singletonList(existingPerson)), new ArrayList<>());
        existingPairingBoard.setId(55L);

        Project existingProject = new Project("Henry", "henrypass", new ArrayList<>(Collections.singletonList(existingPairingBoard)), new ArrayList<>());
        existingProject.setId(1L);

        when(mockProjectRepository.findById(anyLong())).thenReturn(Optional.of(existingProject));
        when(mockProjectRepository.save(any(Project.class))).thenAnswer(i -> i.getArguments()[0]);

        Project expectedProject = new Project("Henry", "henrypass", new ArrayList<>(), new ArrayList<>(Collections.singletonList(existingPerson)));
        expectedProject.setId(1L);

        ProjectDTO updatedProjectDTO = ProjectTransformer.transform(expectedProject);

        mockMvc.perform(delete("/api/project/1/pairingBoard/55"))
                .andExpect(status().isOk())
                .andExpect(content().string(objectMapper.writeValueAsString(updatedProjectDTO)));

        PairingBoard expectedDeletedPairingBoard = new PairingBoard("Ka-Boom", false, new ArrayList<>(Collections.singletonList(existingPerson)), new ArrayList<>());
        expectedDeletedPairingBoard.setId(55L);

        verify(mockParingBoardRepository).delete(expectedDeletedPairingBoard);
        verify(mockProjectRepository).findById(1L);
        verify(mockProjectRepository).save(expectedProject);
    }

    @Test
    public void deletePairingBoard_whenNoPairingBoardMatchesGivenId_returnsError() throws Exception {
        PairingBoard existingPairingBoard = new PairingBoard("Ka-Boom", false, new ArrayList<>(), new ArrayList<>());
        existingPairingBoard.setId(55L);

        Project existingProject = new Project("Henry", "henrypass", new ArrayList<>(Collections.singletonList(existingPairingBoard)), new ArrayList<>());
        existingProject.setId(1L);

        when(mockProjectRepository.findById(anyLong())).thenReturn(Optional.of(existingProject));

        mockMvc.perform(delete("/api/project/1/pairingBoard/33"))
                .andExpect(status().isNotFound())
                .andExpect(jsonPath("$.message", equalTo(null)))
                .andExpect(jsonPath("$.fieldErrors.id", equalTo("Keeaa!? That pairing board doesn't seem to exist.")));

        verify(mockProjectRepository).findById(1L);
    }

}
