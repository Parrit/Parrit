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
                        "\"stations\":[" +
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

        Map<Object, Object> defaultFloatingStation = new HashMap<>();
        defaultFloatingStation.put("name", "Floating");
        defaultFloatingStation.put("people", defaultFloatingPeople);
        Map<Object, Object> defaultDesignStation = new HashMap<>();
        defaultDesignStation.put("name", "Design");
        defaultDesignStation.put("people", new ArrayList<>());
        Map<Object, Object> defaultProductStation = new HashMap<>();
        defaultProductStation.put("name", "Product");
        defaultProductStation.put("people", new ArrayList<>());
        Map<Object, Object> defaultWellesleyStation = new HashMap<>();
        defaultWellesleyStation.put("name", "Wellesley");
        defaultWellesleyStation.put("people", new ArrayList<>());
        Map<Object, Object> defaultPico2Station = new HashMap<>();
        defaultPico2Station.put("name", "Pico2");
        defaultPico2Station.put("people", new ArrayList<>());
        Map<Object, Object> defaultManchesterStation = new HashMap<>();
        defaultManchesterStation.put("name", "Manchester");
        defaultManchesterStation.put("people", new ArrayList<>());
        Map<Object, Object> defaultLarchmontStation = new HashMap<>();
        defaultLarchmontStation.put("name", "Larchmont");
        defaultLarchmontStation.put("people", new ArrayList<>());
        Map<Object, Object> defaultCulverStation = new HashMap<>();
        defaultCulverStation.put("name", "Culver");
        defaultCulverStation.put("people", new ArrayList<>());
        Map<Object, Object> defaultOut_of_OfficeStation = new HashMap<>();
        defaultOut_of_OfficeStation.put("name", "Out_of_Office");
        defaultOut_of_OfficeStation.put("people", new ArrayList<>());

        List<Map<Object, Object>> defaultStationList = new ArrayList<>();
        defaultStationList.add(defaultFloatingStation);
        defaultStationList.add(defaultDesignStation);
        defaultStationList.add(defaultProductStation);
        defaultStationList.add(defaultWellesleyStation);
        defaultStationList.add(defaultPico2Station);
        defaultStationList.add(defaultManchesterStation);
        defaultStationList.add(defaultLarchmontStation);
        defaultStationList.add(defaultCulverStation);
        defaultStationList.add(defaultOut_of_OfficeStation);

        Map<Object, Object> defaultWorkspaceMap = new HashMap<>();
        defaultWorkspaceMap.put("stations", defaultStationList);

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
