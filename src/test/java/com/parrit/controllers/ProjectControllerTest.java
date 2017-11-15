package com.parrit.controllers;

import com.parrit.DTOs.ProjectDTO;
import com.parrit.entities.PairingBoard;
import com.parrit.entities.Person;
import com.parrit.entities.Project;
import com.parrit.repositories.ProjectRepository;
import com.parrit.transformers.ProjectTransformer;
import org.junit.Before;
import org.junit.Rule;
import org.junit.Test;
import org.junit.rules.ExpectedException;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.web.util.NestedServletException;

import java.util.ArrayList;

import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.Matchers.equalTo;
import static org.mockito.Matchers.any;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@RunWith(SpringRunner.class)
@WebMvcTest(controllers = ProjectController.class, secure = false)
public class ProjectControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private ProjectRepository mockProjectRepository;

    private Project persistedProject;
    private Project updatedProject;
    private ProjectDTO updatedProjectDTO;
    private String updatedProjectDTOString;

    @Rule
    public ExpectedException thrown = ExpectedException.none();

    @Before
    public void setUp() {
        persistedProject = new Project("Henry", "henrypass", new ArrayList<>(), new ArrayList<>());
        persistedProject.setId(1L);

        updatedProjectDTO = ProjectTransformer.transform(persistedProject);
        updatedProjectDTOString = "{\"id\":1,\"name\":\"Bob\",\"pairingBoards\":[],\"people\":[]}";

        updatedProject = new Project("Henry", "henrypass", new ArrayList<>(), new ArrayList<>());
        updatedProject.setId(1L);
    }

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
    public void getProject_returnsResultFromRepository() throws Exception {
        when(mockProjectRepository.findByName("anyProjectName")).thenReturn(persistedProject);

        mockMvc.perform(get("/anyProjectName"))
            .andExpect(status().isOk())
            .andExpect(view().name("project"))
            .andExpect(model().attribute("project", updatedProjectDTO));

        verify(mockProjectRepository, never()).save(any(Project.class));
        verify(mockProjectRepository).findByName("anyProjectName");
    }

    //********************//
    //******  APIs  ******//
    //********************//

    @Test
    public void createProject_savesTheNewProject() throws Exception {
        when(mockProjectRepository.save(any(Project.class))).thenReturn(persistedProject);

        mockMvc.perform(post("/api/project/new")
            .contentType(MediaType.APPLICATION_JSON)
            .content("{\"name\":\"bob\",\"password\":\"bobpass\"}"))
            .andExpect(status().isOk());

        Project newProject = new Project("bob", "da7655b5bf67039c3e76a99d8e6fb6969370bbc0fa440cae699cf1a3e2f1e0a1", new ArrayList<>(), new ArrayList<>());

        newProject.getPairingBoards().add(new PairingBoard("COCKATOO", new ArrayList<>()));
        newProject.getPairingBoards().add(new PairingBoard("MACAW", new ArrayList<>()));
        newProject.getPairingBoards().add(new PairingBoard("LOVEBIRD", new ArrayList<>()));
        newProject.getPairingBoards().add(new PairingBoard("PARAKEET", new ArrayList<>()));
        newProject.getPairingBoards().add(new PairingBoard("DESIGN", new ArrayList<>()));
        newProject.getPairingBoards().add(new PairingBoard("OUT OF OFFICE", new ArrayList<>()));

        verify(mockProjectRepository).save(eq(newProject));
    }

    @Test
    public void createProject_throwsAnException_whenThePasswordIsEmpty() throws Exception {
        thrown.expect(NestedServletException.class);

        mockMvc.perform(post("/api/project/new")
            .contentType(MediaType.APPLICATION_JSON)
            .content("{\"name\":\"bob\",\"password\":\"\"}"));
    }

    @Test
    public void saveProject_persistsTheProjectWithChanges_andReturnsTheResult() throws Exception {
        updatedProject.setName("Bob");

        when(mockProjectRepository.findOne(anyLong())).thenReturn(persistedProject);
        when(mockProjectRepository.save(any(Project.class))).thenReturn(updatedProject);

        MvcResult mvcResult = mockMvc.perform(post("/api/project")
            .contentType(MediaType.APPLICATION_JSON)
            .content(updatedProjectDTOString))
            .andExpect(status().isOk())
            .andReturn();

        String returnedProject = mvcResult.getResponse().getContentAsString();
        assertThat(returnedProject, equalTo(updatedProjectDTOString));

        verify(mockProjectRepository).findOne(1L);
        verify(mockProjectRepository).save(eq(updatedProject));
    }

    @Test
    public void addPerson_createsAPersonWithThePassedInName_andReturnsTheUpdatedProject() throws Exception {
        Person newPerson = new Person("Steve");
        updatedProject.getPeople().add(newPerson);

        when(mockProjectRepository.findOne(anyLong())).thenReturn(persistedProject);
        when(mockProjectRepository.save(any(Project.class))).thenReturn(updatedProject);

        MvcResult mvcResult = mockMvc.perform(post("/api/project/2/addPerson")
            .contentType(MediaType.APPLICATION_JSON)
            .content("{\"name\":\"Steve\"}"))
            .andExpect(status().isOk())
            .andReturn();

        String returnedProject = mvcResult.getResponse().getContentAsString();
        assertThat(returnedProject, equalTo("{\"id\":1,\"name\":\"Henry\",\"pairingBoards\":[],\"people\":[{\"id\":0,\"name\":\"Steve\"}]}"));

        verify(mockProjectRepository).findOne(2L);
        verify(mockProjectRepository).save(updatedProject);
    }
}
