package com.test.parrit.controllers;

import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.Matchers.equalTo;
import static org.mockito.Matchers.any;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import com.parrit.controllers.StateController;
import com.test.parrit.support.ControllerTestBase;
import org.junit.Before;
import org.junit.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;

import com.parrit.entities.State;
import com.parrit.repositories.StateRepository;
import org.springframework.test.web.servlet.MvcResult;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class StateControllerTest extends ControllerTestBase {

    @Mock
    StateRepository mockStateRepository;

    @Autowired
    @InjectMocks
    StateController stateController;

    String exampleStateString;
    String defaultStateString;
    State exampleState;
    State defaultState;

    @Before
    public void setUp() {
        defaultStateString = "{\"id\":1,\"jsonContent\":{" +
                    "\"settings\":{" +
                        "\"canMove\":true" +
                    "}," +
                    "\"workspace\":{" +
                        "\"spaces\":[" +
                            "{" +
                                "\"name\":\"Floating\"," +
                                "\"people\":[" +
                                    "{" +
                                        "\"name\":\"Tim\"" +
                                    "}," +
                                    "{" +
                                        "\"name\":\"Anthony\"" +
                                    "}," +
                                    "{" +
                                        "\"name\":\"Gaurav\"" +
                                    "}," +
                                    "{" +
                                        "\"name\":\"Marianna\"" +
                                    "}," +
                                    "{" +
                                        "\"name\":\"Tony\"" +
                                    "}," +
                                    "{" +
                                        "\"name\":\"Pete\"" +
                                    "}," +
                                    "{" +
                                        "\"name\":\"Jared\"" +
                                    "}," +
                                    "{" +
                                        "\"name\":\"Fonzie\"" +
                                    "}," +
                                    "{" +
                                        "\"name\":\"Brian\"" +
                                    "}," +
                                    "{" +
                                        "\"name\":\"Kea\"" +
                                    "}," +
                                    "{" +
                                        "\"name\":\"Lance\"" +
                                    "}," +
                                    "{" +
                                        "\"name\":\"Liz\"" +
                                    "}," +
                                    "{" +
                                        "\"name\":\"Sree\"" +
                                    "}" +
                                "]" +
                            "}," +
                            "{" +
                                "\"name\":\"Design\"," +
                                "\"people\":[]" +
                            "}," +
                            "{" +
                                "\"name\":\"Product\"," +
                                "\"people\":[]" +
                            "}," +
                            "{" +
                                "\"name\":\"Wellesley\"," +
                                "\"people\":[]" +
                            "}," +
                            "{" +
                                "\"name\":\"Pico2\"," +
                                "\"people\":[]" +
                            "}," +
                            "{" +
                                "\"name\":\"Manchester\"," +
                                "\"people\":[]" +
                            "}," +
                            "{" +
                                "\"name\":\"Larchmont\"," +
                                "\"people\":[]" +
                            "}," +
                            "{" +
                                "\"name\":\"Culver\"," +
                                "\"people\":[]" +
                            "}," +
                            "{" +
                                "\"name\":\"Out_of_Office\"," +
                                "\"people\":[]" +
                            "}" +
                        "]" +
                    "}" +
                "}" +
            "}";

        Map<Object, Object> defaultTimPerson = new HashMap<>();
        defaultTimPerson.put("name", "Tim");
        Map<Object, Object> defaultAnthonyPerson = new HashMap<>();
        defaultAnthonyPerson.put("name", "Anthony");
        Map<Object, Object> defaultGauravPerson = new HashMap<>();
        defaultGauravPerson.put("name", "Gaurav");
        Map<Object, Object> defaultMariannaPerson = new HashMap<>();
        defaultMariannaPerson.put("name", "Marianna");
        Map<Object, Object> defaultTonyPerson = new HashMap<>();
        defaultTonyPerson.put("name", "Tony");
        Map<Object, Object> defaultPetePerson = new HashMap<>();
        defaultPetePerson.put("name", "Pete");
        Map<Object, Object> defaultJaredPerson = new HashMap<>();
        defaultJaredPerson.put("name", "Jared");
        Map<Object, Object> defaultFonziePerson = new HashMap<>();
        defaultFonziePerson.put("name", "Fonzie");
        Map<Object, Object> defaultBrianPerson = new HashMap<>();
        defaultBrianPerson.put("name", "Brian");
        Map<Object, Object> defaultKeaPerson = new HashMap<>();
        defaultKeaPerson.put("name", "Kea");
        Map<Object, Object> defaultLancePerson = new HashMap<>();
        defaultLancePerson.put("name", "Lance");
        Map<Object, Object> defaultLizPerson = new HashMap<>();
        defaultLizPerson.put("name", "Liz");
        Map<Object, Object> defaultSreePerson = new HashMap<>();
        defaultSreePerson.put("name", "Sree");

        List<Map<Object, Object>> defaultFloatingPeople = new ArrayList<>();
        defaultFloatingPeople.add(defaultTimPerson);
        defaultFloatingPeople.add(defaultAnthonyPerson);
        defaultFloatingPeople.add(defaultGauravPerson);
        defaultFloatingPeople.add(defaultMariannaPerson);
        defaultFloatingPeople.add(defaultTonyPerson);
        defaultFloatingPeople.add(defaultPetePerson);
        defaultFloatingPeople.add(defaultJaredPerson);
        defaultFloatingPeople.add(defaultFonziePerson);
        defaultFloatingPeople.add(defaultBrianPerson);
        defaultFloatingPeople.add(defaultKeaPerson);
        defaultFloatingPeople.add(defaultLancePerson);
        defaultFloatingPeople.add(defaultLizPerson);
        defaultFloatingPeople.add(defaultSreePerson);

        Map<Object, Object> defaultFloatingSpace = new HashMap<>();
        defaultFloatingSpace.put("name", "Floating");
        defaultFloatingSpace.put("people", defaultFloatingPeople);
        Map<Object, Object> defaultDesignSpace = new HashMap<>();
        defaultDesignSpace.put("name", "Design");
        defaultDesignSpace.put("people", new ArrayList<>());
        Map<Object, Object> defaultProductSpace = new HashMap<>();
        defaultProductSpace.put("name", "Product");
        defaultProductSpace.put("people", new ArrayList<>());
        Map<Object, Object> defaultWellesleySpace = new HashMap<>();
        defaultWellesleySpace.put("name", "Wellesley");
        defaultWellesleySpace.put("people", new ArrayList<>());
        Map<Object, Object> defaultPico2Space = new HashMap<>();
        defaultPico2Space.put("name", "Pico2");
        defaultPico2Space.put("people", new ArrayList<>());
        Map<Object, Object> defaultManchesterSpace = new HashMap<>();
        defaultManchesterSpace.put("name", "Manchester");
        defaultManchesterSpace.put("people", new ArrayList<>());
        Map<Object, Object> defaultLarchmontSpace = new HashMap<>();
        defaultLarchmontSpace.put("name", "Larchmont");
        defaultLarchmontSpace.put("people", new ArrayList<>());
        Map<Object, Object> defaultCulverSpace = new HashMap<>();
        defaultCulverSpace.put("name", "Culver");
        defaultCulverSpace.put("people", new ArrayList<>());
        Map<Object, Object> defaultOut_of_OfficeSpace = new HashMap<>();
        defaultOut_of_OfficeSpace.put("name", "Out_of_Office");
        defaultOut_of_OfficeSpace.put("people", new ArrayList<>());

        List<Map<Object, Object>> defaultSpacesList = new ArrayList<>();
        defaultSpacesList.add(defaultFloatingSpace);
        defaultSpacesList.add(defaultDesignSpace);
        defaultSpacesList.add(defaultProductSpace);
        defaultSpacesList.add(defaultWellesleySpace);
        defaultSpacesList.add(defaultPico2Space);
        defaultSpacesList.add(defaultManchesterSpace);
        defaultSpacesList.add(defaultLarchmontSpace);
        defaultSpacesList.add(defaultCulverSpace);
        defaultSpacesList.add(defaultOut_of_OfficeSpace);

        Map<Object, Object> defaultWorkspaceMap = new HashMap<>();
        defaultWorkspaceMap.put("spaces", defaultSpacesList);

        Map<Object, Object> defaultSettingsMap = new HashMap<>();
        defaultSettingsMap.put("canMove", true);

        Map<Object, Object> defaultJsonMap = new HashMap<>();
        defaultJsonMap.put("settings", defaultSettingsMap);
        defaultJsonMap.put("workspace", defaultWorkspaceMap);

        defaultState = new State();
        defaultState.setId(1L);
        defaultState.setJsonContent(defaultJsonMap);

        exampleStateString = "{\"id\":1,\"jsonContent\":{\"super\":\"man\"}}";

        Map<Object, Object> exampleJsonMap = new HashMap<>();
        exampleJsonMap.put("super", "man");
        exampleState = new State();
        exampleState.setId(1L);
        exampleState.setJsonContent(exampleJsonMap);
    }

    @Test
    public void save_persistsTheInputJson() throws Exception {
        when(mockStateRepository.save(any(State.class))).thenReturn(null);

        mvc.perform(post("/state")
                .contentType(MediaType.APPLICATION_JSON)
                .content(exampleStateString))
                .andExpect(status().isOk());

        verify(mockStateRepository).save(exampleState);
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
        when(mockStateRepository.findOne(anyLong())).thenReturn(null);

        MvcResult mvcResult = mvc.perform(get("/state")
                .param("id", "1"))
                .andExpect(status().isOk())
                .andReturn();

        String returnedState = mvcResult.getResponse().getContentAsString();
        assertThat(returnedState, equalTo(defaultStateString));

        verify(mockStateRepository).findOne(1L);
        verify(mockStateRepository).save(defaultState);
    }
}
