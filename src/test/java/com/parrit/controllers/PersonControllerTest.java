package com.parrit.controllers;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.parrit.DTOs.PersonDTO;
import com.parrit.DTOs.PositionDTO;
import com.parrit.DTOs.ProjectDTO;
import com.parrit.entities.PairingBoard;
import com.parrit.entities.Person;
import com.parrit.entities.Project;
import com.parrit.repositories.ProjectRepository;
import com.parrit.transformers.PersonTransformer;
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

import static org.hamcrest.Matchers.equalTo;
import static org.mockito.Matchers.any;
import static org.mockito.Matchers.anyLong;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@RunWith(SpringRunner.class)
@WebMvcTest(controllers = PersonController.class, secure = false)
public class PersonControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @MockBean
    private ProjectRepository mockProjectRepository;

    @Test
    public void addPerson_createsAPersonWithTheGivenName_andReturnsTheUpdatedProject() throws Exception {
        Project existingProject = new Project("Henry", "henrypass", new ArrayList<>(), new ArrayList<>());
        existingProject.setId(1L);

        Person newPerson = new Person("Steve");

        PersonDTO personDTO = PersonTransformer.transform(newPerson);

        when(mockProjectRepository.findOne(anyLong())).thenReturn(existingProject);
        when(mockProjectRepository.save(any(Project.class))).thenAnswer(i -> i.getArguments()[0]);

        Project expectedUpdatedProject = new Project("Henry", "henrypass", new ArrayList<>(), Collections.singletonList(newPerson));
        expectedUpdatedProject.setId(1L);

        ProjectDTO updatedProjectDTO = ProjectTransformer.transform(expectedUpdatedProject);

        mockMvc.perform(post("/api/project/1/person")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(personDTO)))
                .andExpect(status().isOk())
                .andExpect(content().string(objectMapper.writeValueAsString(updatedProjectDTO)));

        verify(mockProjectRepository).findOne(1L);
        verify(mockProjectRepository).save(expectedUpdatedProject);
    }

    @Test
    public void addPerson_whenNameIsEmpty_returnsError() throws Exception {
        PersonDTO personDTO = new PersonDTO();
        personDTO.setName("");

        mockMvc.perform(post("/api/project/1/person")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(personDTO)))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.message", equalTo(null)))
                .andExpect(jsonPath("$.fieldErrors.name", equalTo("Hey! This name needs to be between 1 and 32 characters.")));
    }

    @Test
    public void addPerson_whenNameIsNull_returnsError() throws Exception {
        PersonDTO personDTO = new PersonDTO();
        personDTO.setName(null);

        mockMvc.perform(post("/api/project/1/person")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(personDTO)))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.message", equalTo(null)))
                .andExpect(jsonPath("$.fieldErrors.name", equalTo("Hey! This name needs to be between 1 and 32 characters.")));
    }

    @Test
    public void addPerson_whenNameIsGreaterThan32Characters_returnsError() throws Exception {
        PersonDTO personDTO = new PersonDTO();
        personDTO.setName("someNameThatIsGreaterThan32Characters");

        mockMvc.perform(post("/api/project/1/person")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(personDTO)))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.message", equalTo(null)))
                .andExpect(jsonPath("$.fieldErrors.name", equalTo("Hey! This name needs to be between 1 and 32 characters.")));
    }

    @Test
    public void movePerson_movesMatchingPersonToFloating_andReturnsTheUpdatedProject() throws Exception {
        Person existingPerson = new Person("Ahh Ohh");
        existingPerson.setId(76L);

        PairingBoard existingPairingBoard = new PairingBoard("Cool Kids", false, new ArrayList<>(Collections.singletonList(existingPerson)));
        existingPairingBoard.setId(88L);

        Project existingProject = new Project("Henry", "henrypass", Collections.singletonList(existingPairingBoard), new ArrayList<>());
        existingProject.setId(1L);

        PositionDTO positionDTO = new PositionDTO();
        positionDTO.setFloating(true);
        positionDTO.setPairingBoardId(0L);

        when(mockProjectRepository.findOne(anyLong())).thenReturn(existingProject);
        when(mockProjectRepository.save(any(Project.class))).thenAnswer(i -> i.getArguments()[0]);

        PairingBoard expectedPairingBoard = new PairingBoard("Cool Kids", false, new ArrayList<>());
        expectedPairingBoard.setId(88L);

        Project expectedUpdatedProject = new Project("Henry", "henrypass", Collections.singletonList(expectedPairingBoard), Collections.singletonList(existingPerson));
        expectedUpdatedProject.setId(1L);

        ProjectDTO updatedProjectDTO = ProjectTransformer.transform(expectedUpdatedProject);

        mockMvc.perform(put("/api/project/1/person/76/position")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(positionDTO)))
                .andExpect(status().isOk())
                .andExpect(content().string(objectMapper.writeValueAsString(updatedProjectDTO)));

        verify(mockProjectRepository).findOne(1L);
        verify(mockProjectRepository).save(expectedUpdatedProject);
    }

    @Test
    public void movePerson_movesMatchingPersonToGivenPairingBoardId_andReturnsTheUpdatedProject() throws Exception {
        Person existingPerson = new Person("Ahh Ohh");
        existingPerson.setId(76L);

        PairingBoard existingPairingBoard = new PairingBoard("Cool Kids", false, new ArrayList<>());
        existingPairingBoard.setId(88L);

        Project existingProject = new Project("Henry", "henrypass", Collections.singletonList(existingPairingBoard), new ArrayList<>(Collections.singletonList(existingPerson)));
        existingProject.setId(1L);

        PositionDTO positionDTO = new PositionDTO();
        positionDTO.setFloating(false);
        positionDTO.setPairingBoardId(88L);

        when(mockProjectRepository.findOne(anyLong())).thenReturn(existingProject);
        when(mockProjectRepository.save(any(Project.class))).thenAnswer(i -> i.getArguments()[0]);

        PairingBoard expectedPairingBoard = new PairingBoard("Cool Kids", false, Collections.singletonList(existingPerson));
        expectedPairingBoard.setId(88L);

        Project expectedUpdatedProject = new Project("Henry", "henrypass", Collections.singletonList(expectedPairingBoard), new ArrayList<>());
        expectedUpdatedProject.setId(1L);

        ProjectDTO updatedProjectDTO = ProjectTransformer.transform(expectedUpdatedProject);

        mockMvc.perform(put("/api/project/1/person/76/position")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(positionDTO)))
                .andExpect(status().isOk())
                .andExpect(content().string(objectMapper.writeValueAsString(updatedProjectDTO)));

        verify(mockProjectRepository).findOne(1L);
        verify(mockProjectRepository).save(expectedUpdatedProject);
    }

    @Test
    public void movePerson_whenIsFloatingIsNull_returnsError() throws Exception {
        PositionDTO positionDTO = new PositionDTO();
        positionDTO.setFloating(null);
        positionDTO.setPairingBoardId(88L);

        mockMvc.perform(put("/api/project/1/person/76/position")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(positionDTO)))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.message", equalTo(null)))
                .andExpect(jsonPath("$.fieldErrors.floating", equalTo("Where are you trying to go? Floating or a pairing board?")));
    }

    @Test
    public void movePerson_whenIsNotFloatingButPairingBoardIdIsNull_returnsError() throws Exception {
        PositionDTO positionDTO = new PositionDTO();
        positionDTO.setFloating(false);
        positionDTO.setPairingBoardId(null);

        mockMvc.perform(put("/api/project/1/person/76/position")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(positionDTO)))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.message", equalTo(null)))
                .andExpect(jsonPath("$.fieldErrors.pairingBoardId", equalTo("Kwak! If your not floating, what are yea?")));
    }

    @Test
    public void movePerson_whenNoPersonMatchesGivenId_returnsError() throws Exception {
        PairingBoard existingPairingBoard = new PairingBoard("Cool Kids", false, new ArrayList<>());
        existingPairingBoard.setId(88L);

        Project existingProject = new Project("Henry", "henrypass", Collections.singletonList(existingPairingBoard), new ArrayList<>());
        existingProject.setId(1L);

        PositionDTO positionDTO = new PositionDTO();
        positionDTO.setFloating(true);
        positionDTO.setPairingBoardId(0L);

        when(mockProjectRepository.findOne(anyLong())).thenReturn(existingProject);

        mockMvc.perform(put("/api/project/1/person/76/position")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(positionDTO)))
                .andExpect(status().isNotFound())
                .andExpect(jsonPath("$.message", equalTo(null)))
                .andExpect(jsonPath("$.fieldErrors.id", equalTo("Keeaa!? That person doesn't seem to exist.")));

        verify(mockProjectRepository).findOne(1L);
    }

    @Test
    public void movePerson_whenNoPairingBoardMatchesGivenId_returnsError() throws Exception {
        Person existingPerson = new Person("Ahh Ohh");
        existingPerson.setId(76L);

        PairingBoard existingPairingBoard = new PairingBoard("Cool Kids", false, new ArrayList<>());
        existingPairingBoard.setId(88L);

        Project existingProject = new Project("Henry", "henrypass", Collections.singletonList(existingPairingBoard), new ArrayList<>(Collections.singletonList(existingPerson)));
        existingProject.setId(1L);

        PositionDTO positionDTO = new PositionDTO();
        positionDTO.setFloating(false);
        positionDTO.setPairingBoardId(89L);

        when(mockProjectRepository.findOne(anyLong())).thenReturn(existingProject);

        mockMvc.perform(put("/api/project/1/person/76/position")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(positionDTO)))
                .andExpect(status().isNotFound())
                .andExpect(jsonPath("$.message", equalTo(null)))
                .andExpect(jsonPath("$.fieldErrors.pairingBoardId", equalTo("Keeaa!? That pairing board doesn't seem to exist.")));

        verify(mockProjectRepository).findOne(1L);
    }

    @Test
    public void deletePerson_removesMatchingPersonFromProject_andReturnsTheUpdatedProject() throws Exception {
        Person existingPerson = new Person("Ahh Ohh");
        existingPerson.setId(76L);

        Project existingProject = new Project("Henry", "henrypass", new ArrayList<>(), new ArrayList<>(Collections.singletonList(existingPerson)));
        existingProject.setId(1L);

        when(mockProjectRepository.findOne(anyLong())).thenReturn(existingProject);
        when(mockProjectRepository.save(any(Project.class))).thenAnswer(i -> i.getArguments()[0]);

        Project expectedUpdatedProject = new Project("Henry", "henrypass", new ArrayList<>(), new ArrayList<>());
        expectedUpdatedProject.setId(1L);

        ProjectDTO updatedProjectDTO = ProjectTransformer.transform(expectedUpdatedProject);

        mockMvc.perform(delete("/api/project/1/person/76"))
                .andExpect(status().isOk())
                .andExpect(content().string(objectMapper.writeValueAsString(updatedProjectDTO)));

        verify(mockProjectRepository).findOne(1L);
        verify(mockProjectRepository).save(expectedUpdatedProject);
    }

    @Test
    public void deletePerson_whenNoPersonMatchesGivenId_returnsError() throws Exception {
        Person existingPerson = new Person("Ahh Ohh");
        existingPerson.setId(76L);

        Project existingProject = new Project("Henry", "henrypass", new ArrayList<>(), new ArrayList<>(Collections.singletonList(existingPerson)));
        existingProject.setId(1L);

        when(mockProjectRepository.findOne(anyLong())).thenReturn(existingProject);

        mockMvc.perform(delete("/api/project/1/person/99"))
                .andExpect(status().isNotFound())
                .andExpect(jsonPath("$.message", equalTo(null)))
                .andExpect(jsonPath("$.fieldErrors.id", equalTo("Keeaa!? That person doesn't seem to exist.")));

        verify(mockProjectRepository).findOne(1L);
    }

}
