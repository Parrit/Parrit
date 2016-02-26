package com.parrit.services;

import com.parrit.entities.Person;
import com.parrit.entities.Space;
import com.parrit.entities.Workspace;
import com.parrit.support.MockitoTestBase;
import org.junit.Before;
import org.junit.Test;

import java.util.ArrayList;
import java.util.Collections;

import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.Matchers.equalTo;

public class RecommendationServiceTest extends MockitoTestBase{

    RecommendationService recommendationService;

    Workspace workspace;
    Space space1;
    Space space2;
    Space space3;
    Person p1;
    Person p2;
    Person p3;
    Person p4;
    Person p5;
    Person p6;

    @Before
    public void setup() {
        recommendationService = new RecommendationService();

        workspace = new Workspace();
        workspace.setPeople(new ArrayList<>());
        workspace.setSpaces(new ArrayList<>());

        space1 = new Space();
        space1.setId(1L);
        space1.setPeople(new ArrayList<>());

        p1 = new Person();
        p1.setId(1L);
    }

    @Test
    public void get_returnsTheSameWorkspace_ifThereAreNotFloatingPeople() {
        Workspace returnedWorkspace = recommendationService.get(workspace, new ArrayList<>());

        assertThat(returnedWorkspace, equalTo(workspace));
    }

    @Test
    public void get_movesAFloatingPersonIntoASpace() {
        workspace.getPeople().add(p1);
        workspace.getSpaces().add(space1);

        Workspace returnedWorkspace = recommendationService.get(workspace, new ArrayList<>());

        Space expectedSpace = new Space();
        expectedSpace.setId(1L);
        expectedSpace.setPeople(Collections.singletonList(p1));

        Workspace expectedWorkspace = new Workspace();
        expectedWorkspace.setSpaces(Collections.singletonList(expectedSpace));
        expectedWorkspace.setPeople(new ArrayList<>());

        assertThat(returnedWorkspace, equalTo(expectedWorkspace));
    }
}