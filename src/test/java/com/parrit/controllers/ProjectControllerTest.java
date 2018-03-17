package com.parrit.controllers;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.parrit.DTOs.NewProjectDTO;
import com.parrit.DTOs.ProjectDTO;
import com.parrit.entities.PairingBoard;
import com.parrit.entities.Person;
import com.parrit.entities.Project;
import com.parrit.repositories.ProjectRepository;
import com.parrit.transformers.ProjectTransformer;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.Optional;

import static org.hamcrest.Matchers.equalTo;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@RunWith(SpringRunner.class)
@WebMvcTest(controllers = ProjectController.class, secure = false)
public class ProjectControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @MockBean
    private ProjectRepository mockProjectRepository;

    @MockBean
    private PasswordEncoder passwordEncoder;

    //*********************//
    //******  Views  ******//
    //*********************//

    @Test
    public void getProject_returnsProjectView_withProjectData() throws Exception {
        Project existingProject = new Project("Henry", "henrypass", new ArrayList<>(), new ArrayList<>());
        existingProject.setId(1L);

        ProjectDTO existingProjectDTO = ProjectTransformer.transform(existingProject);

        when(mockProjectRepository.findByName("anyProjectName")).thenReturn(existingProject);

        mockMvc.perform(get("/anyProjectName"))
                .andExpect(status().isOk())
                .andExpect(view().name("project"))
                .andExpect(model().attribute("project", existingProjectDTO));

        verify(mockProjectRepository).findByName("anyProjectName");
    }

    //********************//
    //******  APIs  ******//
    //********************//

    @Test
    public void createProject_savesTheNewProject() throws Exception {
        Project persistedProject = new Project("Henry", "henrypass", new ArrayList<>(), new ArrayList<>());
        persistedProject.setId(1L);

        NewProjectDTO newProjectDTO = new NewProjectDTO();
        newProjectDTO.setName("bob");
        newProjectDTO.setPassword("bobpass");

        when(mockProjectRepository.save(any(Project.class))).thenReturn(persistedProject);
        when(passwordEncoder.encode("bobpass")).thenReturn("encodedBobpass");

        mockMvc.perform(post("/api/project")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(newProjectDTO)))
                .andExpect(status().isOk());

        Project expectedNewProject = new Project("bob", "encodedBobpass", new ArrayList<>(), new ArrayList<>());

        expectedNewProject.getPairingBoards().add(new PairingBoard("COCKATOO", false, new ArrayList<>(), new ArrayList<>()));
        expectedNewProject.getPairingBoards().add(new PairingBoard("MACAW", false, new ArrayList<>(), new ArrayList<>()));
        expectedNewProject.getPairingBoards().add(new PairingBoard("LOVEBIRD", false, new ArrayList<>(), new ArrayList<>()));
        expectedNewProject.getPairingBoards().add(new PairingBoard("PARAKEET", false, new ArrayList<>(), new ArrayList<>()));
        expectedNewProject.getPairingBoards().add(new PairingBoard("DESIGN", false, new ArrayList<>(), new ArrayList<>()));
        expectedNewProject.getPairingBoards().add(new PairingBoard("OUT OF OFFICE", true, new ArrayList<>(), new ArrayList<>()));

        verify(mockProjectRepository).save(eq(expectedNewProject));
    }

    @Test
    public void createProject_returnsError_whenTheNameIsEmpty() throws Exception {
        NewProjectDTO newProjectDTO = new NewProjectDTO();
        newProjectDTO.setName("");
        newProjectDTO.setPassword("somePassword");

        mockMvc.perform(post("/api/project")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(newProjectDTO)))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.message", equalTo(null)))
                .andExpect(jsonPath("$.fieldErrors.name", equalTo("Uh oh. Your project name must be between 1 and 32 characters.")));
    }

    @Test
    public void createProject_returnsError_whenTheNameIsNull() throws Exception {
        NewProjectDTO newProjectDTO = new NewProjectDTO();
        newProjectDTO.setName(null);
        newProjectDTO.setPassword("somePassword");

        mockMvc.perform(post("/api/project")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(newProjectDTO)))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.message", equalTo(null)))
                .andExpect(jsonPath("$.fieldErrors.name", equalTo("Uh oh. Your project name must be between 1 and 32 characters.")));
    }

    @Test
    public void createProject_returnsError_whenTheNameIsGreaterThan32Characters() throws Exception {
        NewProjectDTO newProjectDTO = new NewProjectDTO();
        newProjectDTO.setName("ThisProjectNameIsGreaterThanThirtyTwoCharactersLong");
        newProjectDTO.setPassword("somePassword");

        mockMvc.perform(post("/api/project")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(newProjectDTO)))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.message", equalTo(null)))
                .andExpect(jsonPath("$.fieldErrors.name", equalTo("Uh oh. Your project name must be between 1 and 32 characters.")));
    }

    @Test
    public void createProject_returnsError_whenThePasswordIsEmpty() throws Exception {
        NewProjectDTO newProjectDTO = new NewProjectDTO();
        newProjectDTO.setName("someName");
        newProjectDTO.setPassword("");

        mockMvc.perform(post("/api/project")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(newProjectDTO)))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.message", equalTo(null)))
                .andExpect(jsonPath("$.fieldErrors.password", equalTo("Keeaa!? Protect yourself with a password!")));
    }

    @Test
    public void createProject_returnsError_whenThePasswordIsNull() throws Exception {
        NewProjectDTO newProjectDTO = new NewProjectDTO();
        newProjectDTO.setName("someName");
        newProjectDTO.setPassword(null);

        mockMvc.perform(post("/api/project")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(newProjectDTO)))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.message", equalTo(null)))
                .andExpect(jsonPath("$.fieldErrors.password", equalTo("Keeaa!? Protect yourself with a password!")));
    }

    @Test
    public void createProject_returnsError_whenBothNameAndPasswordAreInvalid() throws Exception {
        NewProjectDTO newProjectDTO = new NewProjectDTO();
        newProjectDTO.setName("");
        newProjectDTO.setPassword("");

        mockMvc.perform(post("/api/project")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(newProjectDTO)))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.message", equalTo(null)))
                .andExpect(jsonPath("$.fieldErrors.name", equalTo("Uh oh. Your project name must be between 1 and 32 characters.")))
                .andExpect(jsonPath("$.fieldErrors.password", equalTo("Keeaa!? Protect yourself with a password!")));
    }

    @Test
    public void createProject_returnsError_whenAProjectWithTheGivenNameAlreadyExists() throws Exception {
        NewProjectDTO newProjectDTO = new NewProjectDTO();
        newProjectDTO.setName("someName");
        newProjectDTO.setPassword("somePassword");

        when(mockProjectRepository.findByName("someName")).thenReturn(new Project());

        mockMvc.perform(post("/api/project")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(newProjectDTO)))
                .andExpect(status().isConflict())
                .andExpect(jsonPath("$.message", equalTo(null)))
                .andExpect(jsonPath("$.fieldErrors.name", equalTo("Not again. That name already exists, try a different one.")));
    }

    @Test
    public void resetProject_movesAllPeopleIntoFloating_andReturnsTheUpdatedProject() throws Exception {
        Person existingPerson1 = new Person("Billy");
        existingPerson1.setId(7L);

        Person existingPerson2 = new Person("Amelia");
        existingPerson2.setId(8L);

        Person existingPerson3 = new Person("John");
        existingPerson3.setId(9L);

        Person existingPerson4 = new Person("Alexa");
        existingPerson4.setId(10L);

        PairingBoard existingPairingBoard1 = new PairingBoard("Cool Kids", false, new ArrayList<>(Arrays.asList(existingPerson1, existingPerson2)), new ArrayList<>());
        existingPairingBoard1.setId(88L);

        PairingBoard existingPairingBoard2 = new PairingBoard("Lame Kids", false, new ArrayList<>(Collections.singletonList(existingPerson3)), new ArrayList<>());
        existingPairingBoard2.setId(99L);

        Project existingProject = new Project("Henry", "henrypass", new ArrayList<>(Arrays.asList(existingPairingBoard1, existingPairingBoard2)),
                new ArrayList<>(Collections.singleton(existingPerson4)));
        existingProject.setId(1L);

        when(mockProjectRepository.findById(anyLong())).thenReturn(Optional.of(existingProject));
        when(mockProjectRepository.save(any(Project.class))).thenAnswer(i -> i.getArguments()[0]);

        PairingBoard expectedPairingBoard1 = new PairingBoard("Cool Kids", false, new ArrayList<>(), new ArrayList<>());
        expectedPairingBoard1.setId(88L);

        PairingBoard expectedPairingBoard2 = new PairingBoard("Lame Kids", false, new ArrayList<>(), new ArrayList<>());
        expectedPairingBoard2.setId(99L);

        Project expectedProject = new Project("Henry", "henrypass", new ArrayList<>(Arrays.asList(expectedPairingBoard1, expectedPairingBoard2)),
                new ArrayList<>(Arrays.asList(existingPerson4, existingPerson1, existingPerson2, existingPerson3)));
        expectedProject.setId(1L);

        ProjectDTO updatedProjectDTO = ProjectTransformer.transform(expectedProject);

        mockMvc.perform(put("/api/project/1/reset"))
                .andExpect(status().isOk())
                .andExpect(content().string(objectMapper.writeValueAsString(updatedProjectDTO)));

        verify(mockProjectRepository).findById(1L);
        verify(mockProjectRepository).save(eq(expectedProject));
    }

}
