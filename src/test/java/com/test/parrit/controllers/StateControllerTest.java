package com.test.parrit.controllers;

import static org.mockito.Matchers.any;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import com.parrit.controllers.StateController;
import com.test.parrit.support.ControllerTestBase;
import org.json.simple.JSONObject;
import org.junit.Before;
import org.junit.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;

import com.parrit.entities.State;
import com.parrit.repositories.StateRepository;

import java.util.HashMap;
import java.util.Map;

public class StateControllerTest extends ControllerTestBase {

    @Mock
    StateRepository mockStateRepository;

    @Autowired
    @InjectMocks
    StateController stateController;

    String validStateInputString;
    State expectedState;

    @Before
    public void setUp() {
        validStateInputString = "{\"id\": 1, \"jsonContent\": {\"super\": \"man\"} }";

        Map<Object, Object> validJSONInput = new HashMap<>();
        validJSONInput.put("super", "man");
        expectedState = new State();
        expectedState.setId(1L);
        expectedState.setJsonContent(validJSONInput);
    }

    @Test
    public void save_persistsTheInputJson() throws Exception {
        when(mockStateRepository.save(any(State.class))).thenReturn(null);

        mvc.perform(post("/state")
                .contentType(MediaType.APPLICATION_JSON)
                .content(validStateInputString))
                .andExpect(status().isOk());

        verify(mockStateRepository).save(expectedState);
    }

    @Test public void thisShouldFail() throws Exception {
        assert(false);
    }
}
