package com.parrit.services;

import com.parrit.entities.PairingBoard;
import com.parrit.entities.PairingHistory;
import com.parrit.entities.Person;
import com.parrit.entities.Project;
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

    Project project;
    PairingBoard pairingBoard1;
    PairingBoard pairingBoard2;
    PairingBoard pairingBoard3;
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

        project = new Project("One", "onepass", new ArrayList<>(), new ArrayList<>());

        pairingBoard1 = new PairingBoard("One", new ArrayList<>());
        pairingBoard1.setId(1L);
        pairingBoard2 = new PairingBoard("Two", new ArrayList<>());
        pairingBoard2.setId(2L);
        pairingBoard3 = new PairingBoard("Three", new ArrayList<>());
        pairingBoard3.setId(3L);

        p1 = new Person("Alpha");
        p1.setId(1L);
        p2 = new Person("Bravo");
        p2.setId(2L);
        p3 = new Person("Charlie");
        p3.setId(3L);
        p4 = new Person("Delta");
        p4.setId(4L);
        p5 = new Person("Epsilon");
        p5.setId(5L);
        p6 = new Person("Foxtrot");
        p6.setId(6L);

        pairingHistories = new ArrayList<>();

        when(currentTimeProvider.getCurrentTime()).thenReturn(new Timestamp(today));
    }

    @Test
    public void get_returnsTheSameProject_ifThereAreNotFloatingPeople() {
        Project returnedProject = recommendationService.get(project, pairingHistories);

        assertThat(returnedProject, equalTo(project));
    }

    @Test
    public void get_movesAFloatingPersonIntoAPairingBoard_ifThereIsOnlyOnePairingBoardAndNoOneInThePairingBoard() {
        project.getPeople().add(p1);
        project.getPairingBoards().add(pairingBoard1);

        Project returnedProject = recommendationService.get(project, pairingHistories);

        PairingBoard expectedPairingBoard = new PairingBoard("One", Collections.singletonList(p1));
        expectedPairingBoard.setId(1L);

        Project expectedProject = new Project("One", "onepass", Collections.singletonList(expectedPairingBoard), new ArrayList<>());

        assertThat(returnedProject, equalTo(expectedProject));
    }

    @Test
    public void get_movesAFloatingPersonIntoAnEmptySpace_ifAllOtherSpacesHaveAtLeastTwoPeopleInThem() {
        project.getPeople().add(p1);

        pairingBoard1.getPeople().add(p2);
        pairingBoard1.getPeople().add(p3);
        project.getPairingBoards().add(pairingBoard1);

        pairingBoard2.getPeople().add(p4);
        pairingBoard2.getPeople().add(p5);
        pairingBoard2.getPeople().add(p6);
        project.getPairingBoards().add(pairingBoard2);

        project.getPairingBoards().add(pairingBoard3);

        Project returnedProject = recommendationService.get(project, pairingHistories);

        Project expectedProject = new Project("One", "onepass", new ArrayList<>(), new ArrayList<>());

        PairingBoard pairingBoard1Expected = new PairingBoard("One", Arrays.asList(p2, p3));
        pairingBoard1Expected.setId(1L);
        expectedProject.getPairingBoards().add(pairingBoard1Expected);

        PairingBoard pairingBoard2Expected = new PairingBoard("Two", Arrays.asList(p4, p5, p6));
        pairingBoard2Expected.setId(2L);
        expectedProject.getPairingBoards().add(pairingBoard2Expected);

        PairingBoard pairingBoard3Expected = new PairingBoard("Three", Collections.singletonList(p1));
        pairingBoard3Expected.setId(3L);
        expectedProject.getPairingBoards().add(pairingBoard3Expected);

        assertThat(returnedProject, equalTo(expectedProject));
    }

    @Test
    public void get_pairsAFloatingPersonWithALessRecentlyPairedPerson_whenGivenAChoiceBetweenTwoViablePairingBoards() {
        project.getPeople().add(p1);

        pairingBoard1.getPeople().add(p2);
        project.getPairingBoards().add(pairingBoard1);

        pairingBoard2.getPeople().add(p3);
        project.getPairingBoards().add(pairingBoard2);

        PairingHistory p1p2 = new PairingHistory(project, p1, p2, daysAgo(1), "The Pairing Board");
        pairingHistories.add(p1p2);

        PairingHistory p3p1 = new PairingHistory(project, p3, p1, daysAgo(2), "The Second Pairing Board");
        pairingHistories.add(p3p1);

        Project returnedProject = recommendationService.get(project, pairingHistories);

        Project expectedProject = new Project("One", "onepass", new ArrayList<>(), new ArrayList<>());

        PairingBoard pairingBoard1Expected = new PairingBoard("One", Collections.singletonList(p2));
        pairingBoard1Expected.setId(1L);
        expectedProject.getPairingBoards().add(pairingBoard1Expected);

        PairingBoard pairingBoard2Expected = new PairingBoard("Two", Arrays.asList(p3, p1));
        pairingBoard2Expected.setId(2L);
        expectedProject.getPairingBoards().add(pairingBoard2Expected);

        assertThat(returnedProject, equalTo(expectedProject));
    }

    @Test
    public void get_pairsTwoFloatingPeopleWithTwoLessRecentlyPairedPeople_whenBothLessRecentlyPairedWithTheSamePerson() {
        project.getPeople().add(p1);
        project.getPeople().add(p2);

        pairingBoard1.getPeople().add(p3);
        project.getPairingBoards().add(pairingBoard1);

        pairingBoard2.getPeople().add(p4);
        project.getPairingBoards().add(pairingBoard2);

        PairingHistory p1p3 = new PairingHistory(project, p1, p3, daysAgo(1), "The Pairing Board");
        pairingHistories.add(p1p3);

        PairingHistory p4p1 = new PairingHistory(project, p4, p1, daysAgo(3), "The Second Pairing Board");
        pairingHistories.add(p4p1);

        PairingHistory p2p3 = new PairingHistory(project, p2, p3, daysAgo(2), "The Third Pairing Board");
        pairingHistories.add(p2p3);

        PairingHistory p2p4 = new PairingHistory(project, p2, p4, daysAgo(3), "The Fourth Pairing Board");
        pairingHistories.add(p2p4);

        Project returnedProject = recommendationService.get(project, pairingHistories);
        Project expectedProject = new Project("One", "onepass", new ArrayList<>(), new ArrayList<>());

        PairingBoard pairingBoard1Expected = new PairingBoard("One", Arrays.asList(p3, p2));
        pairingBoard1Expected.setId(1L);
        expectedProject.getPairingBoards().add(pairingBoard1Expected);

        PairingBoard pairingBoard2Expected = new PairingBoard("Two", Arrays.asList(p4, p1));
        pairingBoard2Expected.setId(2L);
        expectedProject.getPairingBoards().add(pairingBoard2Expected);

        assertThat(returnedProject, equalTo(expectedProject));
    }

    @Test
    public void get_pairsFloatingPeopleWithPairsThatLeaveGoodChoicesForOthers_whenTheBestChoiceIsNotTheObviousOne() {
        project.getPeople().add(p1);
        project.getPeople().add(p2);

        pairingBoard1.getPeople().add(p3);
        project.getPairingBoards().add(pairingBoard1);

        pairingBoard2.getPeople().add(p4);
        project.getPairingBoards().add(pairingBoard2);

        PairingHistory p1p3 = new PairingHistory(project, p1, p3, daysAgo(25), "The Pairing Board");
        pairingHistories.add(p1p3);

        PairingHistory p4p1 = new PairingHistory(project, p4, p1, daysAgo(30), "The Second Pairing Board");
        pairingHistories.add(p4p1);

        PairingHistory p2p3 = new PairingHistory(project, p2, p3, daysAgo(20), "The Third Pairing Board");
        pairingHistories.add(p2p3);

        PairingHistory p2p4 = new PairingHistory(project, p2, p4, daysAgo(35), "The Fourth Pairing Board");
        pairingHistories.add(p2p4);

        Project returnedProject = recommendationService.get(project, pairingHistories);
        Project expectedProject = new Project("One", "onepass", new ArrayList<>(), new ArrayList<>());

        PairingBoard pairingBoard1Expected = new PairingBoard("One", Arrays.asList(p3, p1));
        pairingBoard1Expected.setId(1L);
        expectedProject.getPairingBoards().add(pairingBoard1Expected);

        PairingBoard pairingBoard2Expected = new PairingBoard("Two", Arrays.asList(p4, p2));
        pairingBoard2Expected.setId(2L);
        expectedProject.getPairingBoards().add(pairingBoard2Expected);

        assertThat(returnedProject, equalTo(expectedProject));
    }

    @Test
    public void get_pairsFloatingPeopleWithPairs_whenThereAreMoreFloatingPeopleThanAvailable() {
        project.getPeople().add(p1);
        project.getPeople().add(p2);

        pairingBoard1.getPeople().add(p3);
        project.getPairingBoards().add(pairingBoard1);

        project.getPairingBoards().add(pairingBoard2);

        PairingHistory p1p2 = new PairingHistory(project, p1, p2, daysAgo(15), "The Pairing Board");
        pairingHistories.add(p1p2);

        PairingHistory p1p3 = new PairingHistory(project, p1, p3, daysAgo(25), "The Pairing Board");
        pairingHistories.add(p1p3);

        Project returnedProject = recommendationService.get(project, pairingHistories);

        Project expectedProject = new Project("One", "onepass", new ArrayList<>(), new ArrayList<>());

        PairingBoard pairingBoard1Expected = new PairingBoard("One", Arrays.asList(p3, p2));
        pairingBoard1Expected.setId(1L);
        expectedProject.getPairingBoards().add(pairingBoard1Expected);

        PairingBoard pairingBoard2Expected = new PairingBoard("Two", Collections.singletonList(p1));
        pairingBoard2Expected.setId(2L);
        expectedProject.getPairingBoards().add(pairingBoard2Expected);

        assertThat(returnedProject, equalTo(expectedProject));
    }

    @Test
    public void get_pairsFloatingPeopleWithEachOtherEfficientlyOverall_whenThereAreMoreFloatingPeopleThanAvailable() {
        project.getPeople().add(p1);
        project.getPeople().add(p2);
        project.getPeople().add(p3);

        pairingBoard1.getPeople().add(p4);
        project.getPairingBoards().add(pairingBoard1);

        project.getPairingBoards().add(pairingBoard2);

        PairingHistory p4p1 = new PairingHistory(project, p4, p1, daysAgo(30), "The Pairing Board");
        pairingHistories.add(p4p1);

        PairingHistory p4p2 = new PairingHistory(project, p4, p2, daysAgo(20), "The Pairing Board");
        pairingHistories.add(p4p2);

        PairingHistory p1p2 = new PairingHistory(project, p1, p2, daysAgo(10), "The Pairing Board");
        pairingHistories.add(p1p2);

        Project returnedProject = recommendationService.get(project, pairingHistories);

        Project expectedProject = new Project("One", "onepass", new ArrayList<>(), new ArrayList<>());

        PairingBoard pairingBoard1Expected = new PairingBoard("One", Arrays.asList(p4, p1));
        pairingBoard1Expected.setId(1L);
        expectedProject.getPairingBoards().add(pairingBoard1Expected);

        PairingBoard pairingBoard2Expected = new PairingBoard("Two", Arrays.asList(p2, p3));
        pairingBoard2Expected.setId(2L);
        expectedProject.getPairingBoards().add(pairingBoard2Expected);

        assertThat(returnedProject, equalTo(expectedProject));
    }

    @Test
    public void get_pairsFloatingPeopleInANewlyCreatedPairingBoard_ifThereAreNotEnoughPairingBoardsLeft() {
        project.getPeople().add(p1);
        project.getPeople().add(p2);
        project.getPeople().add(p3);
        project.getPeople().add(p4);
        project.getPeople().add(p5);

        project.getPairingBoards().add(pairingBoard1);

        Project returnedProject = recommendationService.get(project, pairingHistories);

        Project expectedProject = new Project("One", "onepass", new ArrayList<>(), new ArrayList<>());

        PairingBoard pairingBoard1Expected = new PairingBoard("One", Arrays.asList(p1, p5));
        pairingBoard1Expected.setId(1L);
        expectedProject.getPairingBoards().add(pairingBoard1Expected);

        PairingBoard pairingBoard2Expected = new PairingBoard("New Pairing Board", Arrays.asList(p2, p4)); //Null Id
        expectedProject.getPairingBoards().add(pairingBoard2Expected);

        PairingBoard pairingBoard3Expected = new PairingBoard("New Pairing Board", Collections.singletonList(p3)); //Null Id
        expectedProject.getPairingBoards().add(pairingBoard3Expected);

        assertThat(returnedProject, equalTo(expectedProject));
    }
}