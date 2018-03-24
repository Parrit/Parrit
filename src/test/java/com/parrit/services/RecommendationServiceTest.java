package com.parrit.services;

import com.parrit.entities.PairingBoard;
import com.parrit.entities.PairingHistory;
import com.parrit.entities.Person;
import com.parrit.entities.Project;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.junit.MockitoJUnitRunner;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;

import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.Matchers.equalTo;

@RunWith(MockitoJUnitRunner.class)
public class RecommendationServiceTest {

    private RecommendationService recommendationService;

    private Project project;
    private PairingBoard pairingBoard1;
    private PairingBoard pairingBoard2;
    private PairingBoard pairingBoard3;
    private PairingBoard exemptPairingBoard;
    private Person p1;
    private Person p2;
    private Person p3;
    private Person p4;
    private Person p5;
    private Person p6;
    private List<PairingHistory> pairingHistories;

    private static final int today = 100;
    private Timestamp daysAgo(int days) {
        assert days <= today;
        return new Timestamp(today - days);
    }

    @Before
    public void setup() {
        recommendationService = new RecommendationService();

        project = new Project("One", "onepass", new ArrayList<>(), new ArrayList<>());

        pairingBoard1 = new PairingBoard("One", false, new ArrayList<>(), new ArrayList<>());
        pairingBoard1.setId(1L);
        pairingBoard2 = new PairingBoard("Two", false, new ArrayList<>(), new ArrayList<>());
        pairingBoard2.setId(2L);
        pairingBoard3 = new PairingBoard("Three", false, new ArrayList<>(), new ArrayList<>());
        pairingBoard3.setId(3L);
        exemptPairingBoard = new PairingBoard("Exempt", true, new ArrayList<>(), new ArrayList<>());
        exemptPairingBoard.setId(4L);

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

        PairingBoard expectedPairingBoard = new PairingBoard("One", false, Collections.singletonList(p1), new ArrayList<>());
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

        PairingBoard pairingBoard1Expected = new PairingBoard("One", false, Arrays.asList(p2, p3), new ArrayList<>());
        pairingBoard1Expected.setId(1L);
        expectedProject.getPairingBoards().add(pairingBoard1Expected);

        PairingBoard pairingBoard2Expected = new PairingBoard("Two", false, Arrays.asList(p4, p5, p6), new ArrayList<>());
        pairingBoard2Expected.setId(2L);
        expectedProject.getPairingBoards().add(pairingBoard2Expected);

        PairingBoard pairingBoard3Expected = new PairingBoard("Three", false, Collections.singletonList(p1), new ArrayList<>());
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

        PairingHistory p1p2 = new PairingHistory(project, "The Pairing Board", Arrays.asList(p1, p2), daysAgo(1));
        pairingHistories.add(p1p2);

        PairingHistory p3p1 = new PairingHistory(project, "The Second Pairing Board", Arrays.asList(p3, p1), daysAgo(2));
        pairingHistories.add(p3p1);

        Project returnedProject = recommendationService.get(project, pairingHistories);

        Project expectedProject = new Project("One", "onepass", new ArrayList<>(), new ArrayList<>());

        PairingBoard pairingBoard1Expected = new PairingBoard("One", false, Collections.singletonList(p2), new ArrayList<>());
        pairingBoard1Expected.setId(1L);
        expectedProject.getPairingBoards().add(pairingBoard1Expected);

        PairingBoard pairingBoard2Expected = new PairingBoard("Two", false, Arrays.asList(p3, p1), new ArrayList<>());
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

        PairingHistory p1p3 = new PairingHistory(project, "The Pairing Board", Arrays.asList(p1, p3), daysAgo(1));
        pairingHistories.add(p1p3);

        PairingHistory p4p1 = new PairingHistory(project, "The Second Pairing Board", Arrays.asList(p4, p1), daysAgo(3));
        pairingHistories.add(p4p1);

        PairingHistory p2p3 = new PairingHistory(project, "The Third Pairing Board", Arrays.asList(p2, p3), daysAgo(2));
        pairingHistories.add(p2p3);

        PairingHistory p2p4 = new PairingHistory(project, "The Fourth Pairing Board", Arrays.asList(p2, p4), daysAgo(3));
        pairingHistories.add(p2p4);

        Project returnedProject = recommendationService.get(project, pairingHistories);
        Project expectedProject = new Project("One", "onepass", new ArrayList<>(), new ArrayList<>());

        PairingBoard pairingBoard1Expected = new PairingBoard("One", false, Arrays.asList(p3, p2), new ArrayList<>());
        pairingBoard1Expected.setId(1L);
        expectedProject.getPairingBoards().add(pairingBoard1Expected);

        PairingBoard pairingBoard2Expected = new PairingBoard("Two", false, Arrays.asList(p4, p1), new ArrayList<>());
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

        PairingHistory p1p3 = new PairingHistory(project, "The Pairing Board", Arrays.asList(p1, p3), daysAgo(25));
        pairingHistories.add(p1p3);

        PairingHistory p4p1 = new PairingHistory(project, "The Second Pairing Board", Arrays.asList(p4, p1), daysAgo(30));
        pairingHistories.add(p4p1);

        PairingHistory p2p3 = new PairingHistory(project, "The Third Pairing Board", Arrays.asList(p2, p3), daysAgo(20));
        pairingHistories.add(p2p3);

        PairingHistory p2p4 = new PairingHistory(project, "The Fourth Pairing Board", Arrays.asList(p2, p4), daysAgo(35));
        pairingHistories.add(p2p4);

        Project returnedProject = recommendationService.get(project, pairingHistories);
        Project expectedProject = new Project("One", "onepass", new ArrayList<>(), new ArrayList<>());

        PairingBoard pairingBoard1Expected = new PairingBoard("One", false, Arrays.asList(p3, p1), new ArrayList<>());
        pairingBoard1Expected.setId(1L);
        expectedProject.getPairingBoards().add(pairingBoard1Expected);

        PairingBoard pairingBoard2Expected = new PairingBoard("Two", false, Arrays.asList(p4, p2), new ArrayList<>());
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

        PairingHistory p1p2 = new PairingHistory(project, "The Pairing Board", Arrays.asList(p1, p2), daysAgo(15));
        pairingHistories.add(p1p2);

        PairingHistory p1p3 = new PairingHistory(project, "The Pairing Board", Arrays.asList(p1, p3), daysAgo(25));
        pairingHistories.add(p1p3);

        Project returnedProject = recommendationService.get(project, pairingHistories);

        Project expectedProject = new Project("One", "onepass", new ArrayList<>(), new ArrayList<>());

        PairingBoard pairingBoard1Expected = new PairingBoard("One", false, Arrays.asList(p3, p2), new ArrayList<>());
        pairingBoard1Expected.setId(1L);
        expectedProject.getPairingBoards().add(pairingBoard1Expected);

        PairingBoard pairingBoard2Expected = new PairingBoard("Two", false, Collections.singletonList(p1), new ArrayList<>());
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

        PairingHistory p4p1 = new PairingHistory(project, "The Pairing Board", Arrays.asList(p4, p1), daysAgo(30));
        pairingHistories.add(p4p1);

        PairingHistory p4p2 = new PairingHistory(project, "The Pairing Board", Arrays.asList(p4, p2), daysAgo(20));
        pairingHistories.add(p4p2);

        PairingHistory p1p2 = new PairingHistory(project, "The Pairing Board", Arrays.asList(p1, p2), daysAgo(10));
        pairingHistories.add(p1p2);

        Project returnedProject = recommendationService.get(project, pairingHistories);

        Project expectedProject = new Project("One", "onepass", new ArrayList<>(), new ArrayList<>());

        PairingBoard pairingBoard1Expected = new PairingBoard("One", false, Arrays.asList(p4, p1), new ArrayList<>());
        pairingBoard1Expected.setId(1L);
        expectedProject.getPairingBoards().add(pairingBoard1Expected);

        PairingBoard pairingBoard2Expected = new PairingBoard("Two", false, Arrays.asList(p2, p3), new ArrayList<>());
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

        PairingBoard pairingBoard1Expected = new PairingBoard("One", false, Arrays.asList(p1, p5), new ArrayList<>());
        pairingBoard1Expected.setId(1L);
        expectedProject.getPairingBoards().add(pairingBoard1Expected);

        PairingBoard pairingBoard2Expected = new PairingBoard("New Pairing Board", false, Arrays.asList(p2, p4), new ArrayList<>()); //Null Id
        expectedProject.getPairingBoards().add(pairingBoard2Expected);

        PairingBoard pairingBoard3Expected = new PairingBoard("New Pairing Board", false, Collections.singletonList(p3), new ArrayList<>()); //Null Id
        expectedProject.getPairingBoards().add(pairingBoard3Expected);

        assertThat(returnedProject, equalTo(expectedProject));
    }

    @Test
    public void get_pairsFloatingPeopleWithPairsLeastRecentPaired_withATrairPairingHistory() {
        project.getPeople().add(p1);
        project.getPeople().add(p2);
        project.getPeople().add(p3);

        pairingBoard1.getPeople().add(p4);
        project.getPairingBoards().add(pairingBoard1);

        PairingHistory p1p2p3 = new PairingHistory(project, "The Pairing Board", Arrays.asList(p1, p2, p3), daysAgo(2));
        pairingHistories.add(p1p2p3);

        PairingHistory p4solo = new PairingHistory(project, "The Pairing Board", Collections.singletonList(p4), daysAgo(2));
        pairingHistories.add(p4solo);

        Project returnedProject = recommendationService.get(project, pairingHistories);

        Project expectedProject = new Project("One", "onepass", new ArrayList<>(), new ArrayList<>());

        PairingBoard pairingBoard1Expected = new PairingBoard("One", false, Arrays.asList(p4, p1), new ArrayList<>());
        pairingBoard1Expected.setId(1L);
        expectedProject.getPairingBoards().add(pairingBoard1Expected);

        PairingBoard pairingBoard2Expected = new PairingBoard("New Pairing Board", false, Arrays.asList(p2, p3), new ArrayList<>()); //Null Id
        expectedProject.getPairingBoards().add(pairingBoard2Expected);

        assertThat(returnedProject, equalTo(expectedProject));
    }

    @Test
    public void get_doesNotConsiderPeople_whenTheyAreInExemptPairingBoards() {
        project.getPeople().add(p1);

        exemptPairingBoard.getPeople().add(p2);

        project.getPairingBoards().add(exemptPairingBoard);
        project.getPairingBoards().add(pairingBoard1);

        Project returnedProject = recommendationService.get(project, pairingHistories);

        Project expectedProject = new Project("One", "onepass", new ArrayList<>(), new ArrayList<>());

        PairingBoard exemptBoardExpected = new PairingBoard("Exempt", true, Collections.singletonList(p2), new ArrayList<>());
        exemptBoardExpected.setId(4L);
        expectedProject.getPairingBoards().add(exemptBoardExpected);

        PairingBoard pairingBoard1Expected = new PairingBoard("One", false, Collections.singletonList(p1), new ArrayList<>());
        pairingBoard1Expected.setId(1L);
        expectedProject.getPairingBoards().add(pairingBoard1Expected);

        assertThat(returnedProject, equalTo(expectedProject));
    }

    @Test
    public void get_doesNotUseExemptPairingBoardsToPairFloatingPeople() {
        project.getPeople().add(p1);
        project.getPeople().add(p2);
        project.getPairingBoards().add(exemptPairingBoard);

        Project returnedProject = recommendationService.get(project, pairingHistories);

        Project expectedProject = new Project("One", "onepass", new ArrayList<>(), new ArrayList<>());

        PairingBoard pairingBoardExpectedNew = new PairingBoard("New Pairing Board", false, Arrays.asList(p1, p2), new ArrayList<>());
        pairingBoardExpectedNew.setId(0L);

        PairingBoard pairingBoardExpectedExempt = new PairingBoard("Exempt", true, new ArrayList<>(), new ArrayList<>());
        pairingBoardExpectedExempt.setId(4L);

        expectedProject.getPairingBoards().add(pairingBoardExpectedExempt);
        expectedProject.getPairingBoards().add(pairingBoardExpectedNew);

        assertThat(returnedProject, equalTo(expectedProject));
    }
}
