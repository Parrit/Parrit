package com.parrit.services;

import com.parrit.entities.PairingHistory;
import com.parrit.entities.Person;
import com.parrit.entities.Space;
import com.parrit.entities.Workspace;
import com.parrit.support.MockitoTestBase;
import com.parrit.utilities.CurrentTimeProvider;
import org.junit.Before;
import org.junit.Test;
import org.mockito.Mock;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;

import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.Matchers.equalTo;
import static org.mockito.Mockito.when;

public class RecommendationServiceTest extends MockitoTestBase {

    @Mock
    CurrentTimeProvider currentTimeProvider;

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
    List<PairingHistory> pairingHistories;

    int today = 100;
    private Timestamp daysAgo(int days) {
        assert days <= today;
        return new Timestamp(today - days);
    }

    private void addPairingHistory(Person p1, Person p2, Timestamp time) {
        assert !p1.equals(p2);
        PairingHistory pairingHistory = new PairingHistory();
        pairingHistory.setPersonOne(p1);
        pairingHistory.setPersonTwo(p2);
        pairingHistory.setTimestamp(time);
        pairingHistories.add(pairingHistory);
    }

    @Before
    public void setup() {
        recommendationService = new RecommendationService(currentTimeProvider);

        workspace = new Workspace();
        workspace.setPeople(new ArrayList<>());
        workspace.setSpaces(new ArrayList<>());

        space1 = new Space();
        space1.setId(1L);
        space1.setPeople(new ArrayList<>());

        space2 = new Space();
        space2.setId(2L);
        space2.setPeople(new ArrayList<>());

        space3 = new Space();
        space3.setId(3L);
        space3.setPeople(new ArrayList<>());

        p1 = new Person();
        p1.setId(1L);

        p2 = new Person();
        p2.setId(2L);

        p3 = new Person();
        p3.setId(3L);

        p4 = new Person();
        p4.setId(4L);

        p5 = new Person();
        p5.setId(5L);

        p6 = new Person();
        p6.setId(6L);

        pairingHistories = new ArrayList<>();

        when(currentTimeProvider.getCurrentTime()).thenReturn(new Timestamp(today));
    }

    @Test
    public void get_returnsTheSameWorkspace_ifThereAreNotFloatingPeople() {
        Workspace returnedWorkspace = recommendationService.get(workspace, pairingHistories);

        assertThat(returnedWorkspace, equalTo(workspace));
    }

    @Test
    public void get_movesAFloatingPersonIntoASpace_ifThereIsOnlyOneSpaceAndNoOneInTheSpace() {
        workspace.getPeople().add(p1);
        workspace.getSpaces().add(space1);

        Workspace returnedWorkspace = recommendationService.get(workspace, pairingHistories);

        Space expectedSpace = new Space();
        expectedSpace.setId(1L);
        expectedSpace.setPeople(Collections.singletonList(p1));

        Workspace expectedWorkspace = new Workspace();
        expectedWorkspace.setSpaces(Collections.singletonList(expectedSpace));
        expectedWorkspace.setPeople(new ArrayList<>());

        assertThat(returnedWorkspace, equalTo(expectedWorkspace));
    }

    @Test
    public void get_movesAFloatingPersonIntoAnEmptySpace_ifAllOtherSpacesHaveAtLeastTwoPeopleInThem() {
        workspace.getPeople().add(p1);

        space1.getPeople().add(p2);
        space1.getPeople().add(p3);
        workspace.getSpaces().add(space1);

        space2.getPeople().add(p4);
        space2.getPeople().add(p5);
        space2.getPeople().add(p6);
        workspace.getSpaces().add(space2);

        workspace.getSpaces().add(space3);

        Workspace returnedWorkspace = recommendationService.get(workspace, pairingHistories);

        Workspace expectedWorkspace = new Workspace();
        expectedWorkspace.setPeople(new ArrayList<>());
        expectedWorkspace.setSpaces(new ArrayList<>());

        Space space1Expected = new Space();
        space1Expected.setId(1L);
        space1Expected.setPeople(Arrays.asList(p2, p3));
        expectedWorkspace.getSpaces().add(space1Expected);

        Space space2Expected = new Space();
        space2Expected.setId(2L);
        space2Expected.setPeople(Arrays.asList(p4, p5, p6));
        expectedWorkspace.getSpaces().add(space2Expected);

        Space space3Expected = new Space();
        space3Expected.setId(3L);
        space3Expected.setPeople(Collections.singletonList(p1));
        expectedWorkspace.getSpaces().add(space3Expected);

        assertThat(returnedWorkspace, equalTo(expectedWorkspace));
    }

    @Test
    public void get_pairsAFloatingPersonWithALessRecentlyPairedPerson_whenGivenAChoiceBetweenTwoViableSpaces() {
        workspace.getPeople().add(p1);

        space1.getPeople().add(p2);
        workspace.getSpaces().add(space1);

        space2.getPeople().add(p3);
        workspace.getSpaces().add(space2);

        addPairingHistory(p1, p2, daysAgo(1));
        addPairingHistory(p3, p1, daysAgo(2));

        Workspace returnedWorkspace = recommendationService.get(workspace, pairingHistories);

        Workspace expectedWorkspace = new Workspace();
        expectedWorkspace.setPeople(new ArrayList<>());
        expectedWorkspace.setSpaces(new ArrayList<>());

        Space space1Expected = new Space();
        space1Expected.setId(1L);
        space1Expected.setPeople(Collections.singletonList(p2));
        expectedWorkspace.getSpaces().add(space1Expected);

        Space space2Expected = new Space();
        space2Expected.setId(2L);
        space2Expected.setPeople(Arrays.asList(p3, p1));
        expectedWorkspace.getSpaces().add(space2Expected);

        assertThat(returnedWorkspace, equalTo(expectedWorkspace));
    }

    @Test
    public void get_pairsTwoFloatingPeopleWithTwoLessRecentlyPairedPeople_whenBothLessRecentlyPairedWithTheSamePerson() {
        workspace.getPeople().add(p1);
        workspace.getPeople().add(p2);

        space1.getPeople().add(p3);
        workspace.getSpaces().add(space1);

        space2.getPeople().add(p4);
        workspace.getSpaces().add(space2);

        addPairingHistory(p1, p3, daysAgo(1));
        addPairingHistory(p4, p1, daysAgo(3));
        addPairingHistory(p2, p3, daysAgo(2));
        addPairingHistory(p2, p4, daysAgo(3));

        Workspace returnedWorkspace = recommendationService.get(workspace, pairingHistories);

        Workspace expectedWorkspace = new Workspace();
        expectedWorkspace.setPeople(new ArrayList<>());
        expectedWorkspace.setSpaces(new ArrayList<>());

        Space space1Expected = new Space();
        space1Expected.setId(1L);
        space1Expected.setPeople(Arrays.asList(p3, p2));
        expectedWorkspace.getSpaces().add(space1Expected);

        Space space2Expected = new Space();
        space2Expected.setId(2L);
        space2Expected.setPeople(Arrays.asList(p4, p1));
        expectedWorkspace.getSpaces().add(space2Expected);

        assertThat(returnedWorkspace, equalTo(expectedWorkspace));
    }

    @Test
    public void get_pairsFloatingPeopleWithPairsThatLeaveGoodChoicesForOthers_whenTheBestChoiceIsNotTheObviousOne() {
        workspace.getPeople().add(p1);
        workspace.getPeople().add(p2);

        space1.getPeople().add(p3);
        workspace.getSpaces().add(space1);

        space2.getPeople().add(p4);
        workspace.getSpaces().add(space2);

        addPairingHistory(p1, p3, daysAgo(25));
        addPairingHistory(p4, p1, daysAgo(30));
        addPairingHistory(p2, p3, daysAgo(20));
        addPairingHistory(p2, p4, daysAgo(35));

        Workspace returnedWorkspace = recommendationService.get(workspace, pairingHistories);

        Workspace expectedWorkspace = new Workspace();
        expectedWorkspace.setPeople(new ArrayList<>());
        expectedWorkspace.setSpaces(new ArrayList<>());

        Space space1Expected = new Space();
        space1Expected.setId(1L);
        space1Expected.setPeople(Arrays.asList(p3, p1));
        expectedWorkspace.getSpaces().add(space1Expected);

        Space space2Expected = new Space();
        space2Expected.setId(2L);
        space2Expected.setPeople(Arrays.asList(p4, p2));
        expectedWorkspace.getSpaces().add(space2Expected);

        assertThat(returnedWorkspace, equalTo(expectedWorkspace));
    }

    @Test
    public void get_pairsFloatingPeopleWithPairs_whenThereAreMoreFloatingPeopleThanAvailable() {
        workspace.getPeople().add(p1);
        workspace.getPeople().add(p2);

        space1.getPeople().add(p3);
        workspace.getSpaces().add(space1);

        workspace.getSpaces().add(space2);

        addPairingHistory(p1, p3, daysAgo(25));

        Workspace returnedWorkspace = recommendationService.get(workspace, pairingHistories);

        Workspace expectedWorkspace = new Workspace();
        expectedWorkspace.setPeople(new ArrayList<>());
        expectedWorkspace.setSpaces(new ArrayList<>());

        Space space1Expected = new Space();
        space1Expected.setId(1L);
        space1Expected.setPeople(Arrays.asList(p3, p2));
        expectedWorkspace.getSpaces().add(space1Expected);

        Space space2Expected = new Space();
        space2Expected.setId(2L);
        space2Expected.setPeople(Collections.singletonList(p1));
        expectedWorkspace.getSpaces().add(space2Expected);

        assertThat(returnedWorkspace, equalTo(expectedWorkspace));
    }
}