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

import java.util.HashMap;
import java.util.Map;

public class StateControllerTest extends ControllerTestBase {

    @Mock
    StateRepository mockStateRepository;

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
        when(mockStateRepository.findOne(anyLong())).thenReturn(null);

        mvc.perform(get("/state")
                .param("id", "1"))
                .andExpect(status().isOk())
                .andReturn();

        verify(mockStateRepository).findOne(1L);
    }
}
