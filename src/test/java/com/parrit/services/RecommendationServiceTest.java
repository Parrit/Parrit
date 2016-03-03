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

    @Before
    public void setup() {
        recommendationService = new RecommendationService(currentTimeProvider);

        workspace = new Workspace("One", new ArrayList<>(), new ArrayList<>());

        space1 = new Space(1L, new ArrayList<>(), "One");
        space2 = new Space(2L, new ArrayList<>(), "Two");
        space3 = new Space(3L, new ArrayList<>(), "Three");

        p1 = new Person(1L, "Alpha");
        p2 = new Person(2L, "Bravo");
        p3 = new Person(3L, "Charlie");
        p4 = new Person(4L, "Delta");
        p5 = new Person(5L, "Epsilon");
        p6 = new Person(6L, "Foxtrot");

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

        Space expectedSpace = new Space(1L, Collections.singletonList(p1), "One");

        Workspace expectedWorkspace = new Workspace("One", Collections.singletonList(expectedSpace), new ArrayList<>());

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

        Workspace expectedWorkspace = new Workspace("One", new ArrayList<>(), new ArrayList<>());

        Space space1Expected = new Space(1L, Arrays.asList(p2, p3), "One");
        expectedWorkspace.getSpaces().add(space1Expected);

        Space space2Expected = new Space(2L, Arrays.asList(p4, p5, p6), "Two");
        expectedWorkspace.getSpaces().add(space2Expected);

        Space space3Expected = new Space(3L, Collections.singletonList(p1), "Three");
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

        PairingHistory p1p2 = new PairingHistory(workspace, p1, p2, daysAgo(1), 1L);
        pairingHistories.add(p1p2);

        PairingHistory p3p1 = new PairingHistory(workspace, p3, p1, daysAgo(2), 2L);
        pairingHistories.add(p3p1);

        Workspace returnedWorkspace = recommendationService.get(workspace, pairingHistories);

        Workspace expectedWorkspace = new Workspace("One", new ArrayList<>(), new ArrayList<>());

        Space space1Expected = new Space(1L, Collections.singletonList(p2), "One");
        expectedWorkspace.getSpaces().add(space1Expected);

        Space space2Expected = new Space(2L, Arrays.asList(p3, p1), "Two");
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

        PairingHistory p1p3 = new PairingHistory(workspace, p1, p3, daysAgo(1), 1L);
        pairingHistories.add(p1p3);

        PairingHistory p4p1 = new PairingHistory(workspace, p4, p1, daysAgo(3), 2L);
        pairingHistories.add(p4p1);

        PairingHistory p2p3 = new PairingHistory(workspace, p2, p3, daysAgo(2), 3L);
        pairingHistories.add(p2p3);

        PairingHistory p2p4 = new PairingHistory(workspace, p2, p4, daysAgo(3), 4L);
        pairingHistories.add(p2p4);

        Workspace returnedWorkspace = recommendationService.get(workspace, pairingHistories);
        Workspace expectedWorkspace = new Workspace("One", new ArrayList<>(), new ArrayList<>());

        Space space1Expected = new Space(1L, Arrays.asList(p3, p2), "One");
        expectedWorkspace.getSpaces().add(space1Expected);

        Space space2Expected = new Space(2L, Arrays.asList(p4, p1), "Two");
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

        PairingHistory p1p3 = new PairingHistory(workspace, p1, p3, daysAgo(25), 1L);
        pairingHistories.add(p1p3);

        PairingHistory p4p1 = new PairingHistory(workspace, p4, p1, daysAgo(30), 2L);
        pairingHistories.add(p4p1);

        PairingHistory p2p3 = new PairingHistory(workspace, p2, p3, daysAgo(20), 3L);
        pairingHistories.add(p2p3);

        PairingHistory p2p4 = new PairingHistory(workspace, p2, p4, daysAgo(35), 4L);
        pairingHistories.add(p2p4);

        Workspace returnedWorkspace = recommendationService.get(workspace, pairingHistories);
        Workspace expectedWorkspace = new Workspace("One", new ArrayList<>(), new ArrayList<>());

        Space space1Expected = new Space(1L, Arrays.asList(p3, p1), "One");
        expectedWorkspace.getSpaces().add(space1Expected);

        Space space2Expected = new Space(2L, Arrays.asList(p4, p2), "Two");
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

        PairingHistory p1p2 = new PairingHistory(workspace, p1, p2, daysAgo(15), 1L);
        pairingHistories.add(p1p2);

        PairingHistory p1p3 = new PairingHistory(workspace, p1, p3, daysAgo(25), 1L);
        pairingHistories.add(p1p3);

        Workspace returnedWorkspace = recommendationService.get(workspace, pairingHistories);

        Workspace expectedWorkspace = new Workspace("One", new ArrayList<>(), new ArrayList<>());

        Space space1Expected = new Space(1L, Arrays.asList(p3, p2), "One");
        expectedWorkspace.getSpaces().add(space1Expected);

        Space space2Expected = new Space(2L, Collections.singletonList(p1), "Two");
        expectedWorkspace.getSpaces().add(space2Expected);

        assertThat(returnedWorkspace, equalTo(expectedWorkspace));
    }

    @Test
    public void get_pairsFloatingPeopleWithEachOtherEfficientlyOverall_whenThereAreMoreFloatingPeopleThanAvailable() {
        workspace.getPeople().add(p1);
        workspace.getPeople().add(p2);
        workspace.getPeople().add(p3);

        space1.getPeople().add(p4);
        workspace.getSpaces().add(space1);

        workspace.getSpaces().add(space2);

        PairingHistory p4p1 = new PairingHistory(workspace, p4, p1, daysAgo(30), 1L);
        pairingHistories.add(p4p1);

        PairingHistory p4p2 = new PairingHistory(workspace, p4, p2, daysAgo(20), 1L);
        pairingHistories.add(p4p2);

        PairingHistory p1p2 = new PairingHistory(workspace, p1, p2, daysAgo(10), 1L);
        pairingHistories.add(p1p2);

        Workspace returnedWorkspace = recommendationService.get(workspace, pairingHistories);

        Workspace expectedWorkspace = new Workspace("One", new ArrayList<>(), new ArrayList<>());

        Space space1Expected = new Space(1L, Arrays.asList(p4, p1), "One");
        expectedWorkspace.getSpaces().add(space1Expected);

        Space space2Expected = new Space(2L, Arrays.asList(p2, p3), "Two");
        expectedWorkspace.getSpaces().add(space2Expected);

        assertThat(returnedWorkspace, equalTo(expectedWorkspace));
    }
}