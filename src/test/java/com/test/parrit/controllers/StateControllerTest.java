package com.test.parrit.controllers;

import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.Matchers.containsString;
import static org.hamcrest.Matchers.equalTo;
import static org.mockito.Matchers.any;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import com.parrit.controllers.StateController;
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

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class StateControllerTest extends ControllerTestBase {

    @Mock
    StateRepository mockStateRepository;
    @Mock
    SettingsRepository mockSettingsRepository;
    @Mock
    WorkspaceRepository mockWorkspaceRepository;
    @Mock
    SpaceRepository mockSpaceRepository;
    @Mock
    PersonRepository mockPersonRepository;

    @Autowired
    @InjectMocks
    StateController stateController;

    String exampleStateString;
    State exampleState;

    @Before
    public void setUp() {
        exampleStateString = "{\"id\":1,\"settings\":null,\"workspace\":null}";

        Map<Object, Object> exampleJsonMap = new HashMap<>();
        exampleJsonMap.put("super", "man");
        exampleState = new State();
        exampleState.setId(1L);
    }

    @Test
    public void save_persistsTheInputJson() throws Exception {
        when(mockStateRepository.save(any(State.class))).thenReturn(null);

        mvc.perform(post("/state")
                .contentType(MediaType.APPLICATION_JSON)
                .content(exampleStateString))
                .andExpect(status().isOk());

        verify(mockStateRepository).save(any(State.class));
    }

    @Test
    public void get_whenStateExistsInRepository_returnsState() throws Exception {
        when(mockStateRepository.findOne(anyLong())).thenReturn(exampleState);

        MvcResult mvcResult = mvc.perform(get("/state")
                .param("id", "1"))
                .andExpect(status().isOk())
                .andReturn();

        String returnedState = mvcResult.getResponse().getContentAsString();
        assertThat(returnedState, equalTo(exampleStateString));

        verify(mockStateRepository).findOne(1L);
    }

    @Test
    public void get_whenStateDoesNotExistsInRepository_returnsAndSavesDefaultStateForTheGivenId() throws Exception {
        State expectedState = defaultState();
        expectedState.setId(3L);

        when(mockStateRepository.findOne(anyLong())).thenReturn(null);
        when(mockStateRepository.save(any(State.class))).thenReturn(expectedState);

        MvcResult mvcResult = mvc.perform(get("/state")
                .param("id", "3"))
                .andExpect(status().isOk())
                .andReturn();

        String returnedState = mvcResult.getResponse().getContentAsString();
        assertThat(returnedState, containsString("\"id\":3"));

        verify(mockStateRepository).findOne(3L);
        verify(mockStateRepository).save(expectedState);
        verify(mockSettingsRepository).save(expectedState.getSettings());
        verify(mockWorkspaceRepository).save(expectedState.getWorkspace());
        verify(mockSpaceRepository, times(9)).save(any(Space.class));
        verify(mockPersonRepository, times(12)).save(any(Person.class));
    }

    private State defaultState() {
        Person tim      = new Person("Tim");
        Person gaurav   = new Person("Gaurav");
        Person marianna = new Person("Marianna");
        Person tony     = new Person("Tony");
        Person pete     = new Person("Pete");
        Person jared    = new Person("Jared");
        Person fonzie   = new Person("Fonzie");
        Person brian    = new Person("Brian");
        Person kea      = new Person("Kea");
        Person lance    = new Person("Lance");
        Person liz      = new Person("Liz");
        Person sree     = new Person("Sree");

        List people = new ArrayList();
        people.add(tim);
        people.add(gaurav);
        people.add(marianna);
        people.add(tony);
        people.add(pete);
        people.add(jared);
        people.add(fonzie);
        people.add(brian);
        people.add(kea);
        people.add(lance);
        people.add(liz);
        people.add(sree);

        Space floating    = new Space("Floating");
        Space design      = new Space("Design");
        Space product     = new Space("Product");
        Space wellesley   = new Space("Wellesley");
        Space pico2       = new Space("Pico2");
        Space manchester  = new Space("Manchester");
        Space larchmont   = new Space("Larchmont");
        Space culver      = new Space("Culver");
        Space outOfOffice = new Space("Out of Office");

        List spaces = new ArrayList();
        spaces.add(floating);
        spaces.add(design);
        spaces.add(product);
        spaces.add(wellesley);
        spaces.add(pico2);
        spaces.add(manchester);
        spaces.add(larchmont);
        spaces.add(culver);
        spaces.add(outOfOffice);

        floating.setPeople(people);
        design.setPeople(new ArrayList());
        product.setPeople(new ArrayList());
        wellesley.setPeople(new ArrayList());
        pico2.setPeople(new ArrayList());
        manchester.setPeople(new ArrayList());
        larchmont.setPeople(new ArrayList());
        culver.setPeople(new ArrayList());
        outOfOffice.setPeople(new ArrayList());

        Workspace workspace = new Workspace();
        workspace.setSpaces(spaces);

        Settings settings = new Settings();
        settings.setCanMove(true);

        State state = new State();
        state.setWorkspace(workspace);
        state.setSettings(settings);

        return state;
    }
}
