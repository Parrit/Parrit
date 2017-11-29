package com.parrit.controllers;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.parrit.DTOs.NewProjectDTO;
import com.parrit.DTOs.PairingBoardDTO;
import com.parrit.DTOs.PersonDTO;
import com.parrit.DTOs.ProjectDTO;
import com.parrit.entities.PairingBoard;
import com.parrit.entities.Person;
import com.parrit.entities.Project;
import com.parrit.repositories.ProjectRepository;
import com.parrit.transformers.PairingBoardTransformer;
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
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
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

    //*********************//
    //******  Views  ******//
    //*********************//

    @Test
    public void getDashboard_returnsDashboardView() throws Exception {
        mockMvc.perform(get("/"))
                .andExpect(status().isOk())
                .andExpect(view().name("dashboard"));
    }

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

        mockMvc.perform(post("/api/project")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(newProjectDTO)))
                .andExpect(status().isOk());

        Project expectedNewProject = new Project("bob", "da7655b5bf67039c3e76a99d8e6fb6969370bbc0fa440cae699cf1a3e2f1e0a1", new ArrayList<>(), new ArrayList<>());

        expectedNewProject.getPairingBoards().add(new PairingBoard("COCKATOO", false, new ArrayList<>()));
        expectedNewProject.getPairingBoards().add(new PairingBoard("MACAW", false, new ArrayList<>()));
        expectedNewProject.getPairingBoards().add(new PairingBoard("LOVEBIRD", false, new ArrayList<>()));
        expectedNewProject.getPairingBoards().add(new PairingBoard("PARAKEET", false, new ArrayList<>()));
        expectedNewProject.getPairingBoards().add(new PairingBoard("DESIGN", false, new ArrayList<>()));
        expectedNewProject.getPairingBoards().add(new PairingBoard("OUT OF OFFICE", true, new ArrayList<>()));

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
    public void saveProject_persistsTheProjectWithChanges_andReturnsTheResult() throws Exception {
        Project existingProject = new Project("Henry", "henrypass", new ArrayList<>(), new ArrayList<>());
        existingProject.setId(1L);

        ProjectDTO updatedProjectDTO = ProjectTransformer.transform(existingProject);
        updatedProjectDTO.setName("Bob");

        when(mockProjectRepository.findOne(anyLong())).thenReturn(existingProject);
        when(mockProjectRepository.save(any(Project.class))).thenAnswer(i -> i.getArguments()[0]);

        mockMvc.perform(put("/api/project/1")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(updatedProjectDTO)))
                .andExpect(status().isOk())
                .andExpect(content().string(objectMapper.writeValueAsString(updatedProjectDTO)));

        Project expectedUpdatedProject = new Project("Bob", "henrypass", new ArrayList<>(), new ArrayList<>());
        expectedUpdatedProject.setId(1L);

        verify(mockProjectRepository).findOne(1L);
        verify(mockProjectRepository).save(eq(expectedUpdatedProject));
    }

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
    public void addPairingBoard_createsAPairingBoardWithTheGivenName_andReturnsTheUpdatedProject() throws Exception {
        Project existingProject = new Project("Henry", "henrypass", new ArrayList<>(), new ArrayList<>());
        existingProject.setId(1L);

        PairingBoard newPairingBoard = new PairingBoard("Cool Kids", false, new ArrayList<>());

        PairingBoardDTO pairingBoardDTO = PairingBoardTransformer.transform(newPairingBoard);

        when(mockProjectRepository.findOne(anyLong())).thenReturn(existingProject);
        when(mockProjectRepository.save(any(Project.class))).thenAnswer(i -> i.getArguments()[0]);

        Project expectedUpdatedProject = new Project("Henry", "henrypass", Collections.singletonList(newPairingBoard), new ArrayList<>());
        expectedUpdatedProject.setId(1L);

        ProjectDTO updatedProjectDTO = ProjectTransformer.transform(expectedUpdatedProject);

        mockMvc.perform(post("/api/project/1/pairingBoard")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(pairingBoardDTO)))
                .andExpect(status().isOk())
                .andExpect(content().string(objectMapper.writeValueAsString(updatedProjectDTO)));

        verify(mockProjectRepository).findOne(1L);
        verify(mockProjectRepository).save(expectedUpdatedProject);
    }

    @Test
    public void addPairingBoard_whenNameIsEmpty_returnsError() throws Exception {
        PairingBoardDTO pairingBoardDTO = new PairingBoardDTO();
        pairingBoardDTO.setName("");

        mockMvc.perform(post("/api/project/1/person")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(pairingBoardDTO)))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.message", equalTo(null)))
                .andExpect(jsonPath("$.fieldErrors.name", equalTo("Hey! This name needs to be between 1 and 32 characters.")));
    }

    @Test
    public void addPairingBoard_whenNameIsNull_returnsError() throws Exception {
        PairingBoardDTO pairingBoardDTO = new PairingBoardDTO();
        pairingBoardDTO.setName(null);

        mockMvc.perform(post("/api/project/1/person")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(pairingBoardDTO)))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.message", equalTo(null)))
                .andExpect(jsonPath("$.fieldErrors.name", equalTo("Hey! This name needs to be between 1 and 32 characters.")));
    }
}
