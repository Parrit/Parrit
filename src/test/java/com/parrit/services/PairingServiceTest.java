package com.parrit.services;

import com.parrit.entities.PairingBoard;
import com.parrit.entities.PairingHistory;
import com.parrit.entities.Person;
import com.parrit.entities.Project;
import com.parrit.repositories.PairingHistoryRepository;
import com.parrit.utilities.CurrentTimeProvider;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;

import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.Matchers.equalTo;
import static org.hamcrest.Matchers.not;
import static org.hamcrest.Matchers.sameInstance;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class PairingServiceTest {

    private PairingService pairingService;

    @Mock
    private PairingHistoryRepository mockPairingHistoryRepository;

    @Mock
    private RecommendationService mockRecommendationService;

    @Mock
    private CurrentTimeProvider mockCurrentTimeProvider;

    private final Timestamp currentTime = new Timestamp(1456364985548L);

    @BeforeEach
    public void setup() {
        pairingService = new PairingService(mockPairingHistoryRepository, mockRecommendationService, mockCurrentTimeProvider);

        when(mockCurrentTimeProvider.getCurrentTime()).thenReturn(currentTime);
    }

    @Test
    public void savePairing_createsAPairingHistory_andPersistsIt() {
        Person p1 = new Person("John");
        p1.setId(1L);
        Person p2 = new Person("Mary");
        p2.setId(2L);

        PairingBoard pairingBoard = new PairingBoard("The Pairing Board", false, Arrays.asList(p1, p2), new ArrayList<>());
        pairingBoard.setId(1L);
        List<PairingBoard> pairingBoards = Collections.singletonList(pairingBoard);

        Project project = new Project("One", "onepass", pairingBoards, new ArrayList<>());

        when(mockPairingHistoryRepository.save(any(PairingHistory.class))).thenAnswer(i -> i.getArguments()[0]);

        List<PairingHistory> result = pairingService.savePairing(project);

        PairingHistory expectedPairingHistory = new PairingHistory(project, "The Pairing Board", Arrays.asList(p1, p2), currentTime);

        assertThat(result, equalTo(Collections.singletonList(expectedPairingHistory)));

        verify(mockCurrentTimeProvider, times(1)).getCurrentTime();
        verify(mockPairingHistoryRepository).save(eq(expectedPairingHistory));
    }

    @Test
    public void savePairing_createsMultiplePairingHistoriesWithDifferentPairingBoardNames_whenThereAreMoreThanOnePairingBoards() {
        Person p1 = new Person("John");
        p1.setId(1L);
        Person p2 = new Person("Mary");
        p2.setId(2L);
        Person p3 = new Person("Steve");
        p3.setId(3L);
        Person p4 = new Person("Tammy");
        p4.setId(4L);

        PairingBoard pairingBoard1 = new PairingBoard("The Pairing Board", false, Arrays.asList(p1, p2), new ArrayList<>());
        pairingBoard1.setId(1L);
        PairingBoard pairingBoard2 = new PairingBoard("The Second Pairing Board", false, Arrays.asList(p3, p4), new ArrayList<>());
        pairingBoard2.setId(2L);

        List<PairingBoard> pairingBoards = Arrays.asList(pairingBoard1, pairingBoard2);

        Project project = new Project("One", "onepass", pairingBoards, new ArrayList<>());

        when(mockPairingHistoryRepository.save(any(PairingHistory.class))).thenAnswer(i -> i.getArguments()[0]);

        List<PairingHistory> result = pairingService.savePairing(project);

        PairingHistory expectedPairingHistory1 = new PairingHistory(project, "The Pairing Board", Arrays.asList(p1, p2), currentTime);
        PairingHistory expectedPairingHistory2 = new PairingHistory(project, "The Second Pairing Board", Arrays.asList(p3, p4), currentTime);

        assertThat(result, equalTo(Arrays.asList(expectedPairingHistory1, expectedPairingHistory2)));

        verify(mockCurrentTimeProvider, times(1)).getCurrentTime();
        verify(mockPairingHistoryRepository).save(eq(expectedPairingHistory1));
        verify(mockPairingHistoryRepository).save(eq(expectedPairingHistory2));
    }

    @Test
    public void savePairing_createsMultiplePairingHistoriesWithSamePairingBoardName_whenAPairingBoardHasMoreThanTwoPeople() {
        Person p1 = new Person("John");
        p1.setId(1L);
        Person p2 = new Person("Mary");
        p2.setId(2L);
        Person p3 = new Person("Steve");
        p3.setId(3L);

        PairingBoard pairingBoard = new PairingBoard("The Pairing Board", false, Arrays.asList(p1, p2, p3), new ArrayList<>());
        pairingBoard.setId(1L);

        List<PairingBoard> pairingBoards = Collections.singletonList(pairingBoard);

        Project project = new Project("One", "onepass", pairingBoards, new ArrayList<>());

        when(mockPairingHistoryRepository.save(any(PairingHistory.class))).thenAnswer(i -> i.getArguments()[0]);

        List<PairingHistory> result = pairingService.savePairing(project);

        PairingHistory expectedPairingHistory = new PairingHistory(project, "The Pairing Board", Arrays.asList(p1, p2, p3), currentTime);

        assertThat(result, equalTo(Collections.singletonList(expectedPairingHistory)));

        verify(mockCurrentTimeProvider, times(1)).getCurrentTime();
        verify(mockPairingHistoryRepository).save(eq(expectedPairingHistory));
    }

    @Test
    public void savePairing_createsAPairingHistory_whenThereIsOnlyOnePersonInAPairingBoard() {
        Person p1 = new Person("John");
        p1.setId(1L);

        PairingBoard pairingBoard = new PairingBoard("The Pairing Board", false, Collections.singletonList(p1), new ArrayList<>());
        pairingBoard.setId(1L);

        List<PairingBoard> pairingBoards = Collections.singletonList(pairingBoard);

        Project project = new Project("One", "onepass", pairingBoards, new ArrayList<>());

        when(mockPairingHistoryRepository.save(any(PairingHistory.class))).thenAnswer(i -> i.getArguments()[0]);

        List<PairingHistory> result = pairingService.savePairing(project);

        PairingHistory expectedPairingHistory = new PairingHistory(project, "The Pairing Board", Collections.singletonList(p1), currentTime);

        assertThat(result, equalTo(Collections.singletonList(expectedPairingHistory)));

        verify(mockCurrentTimeProvider, times(1)).getCurrentTime();
        verify(mockPairingHistoryRepository).save(eq(expectedPairingHistory));
    }

    @Test
    public void savePairing_doesNotCreateAPairingHistory_whenThereIsNoOneInAPairingBoard() {
        PairingBoard pairingBoard = new PairingBoard("The Pairing Board", false, Collections.emptyList(), new ArrayList<>());
        pairingBoard.setId(1L);

        List<PairingBoard> pairingBoards = Collections.singletonList(pairingBoard);

        Project project = new Project("One", "onepass", pairingBoards, new ArrayList<>());

        List<PairingHistory> result = pairingService.savePairing(project);
        assertThat(result, equalTo(Collections.emptyList()));

        verify(mockCurrentTimeProvider, times(1)).getCurrentTime();
        verifyNoInteractions(mockPairingHistoryRepository);
    }

    @Test
    public void savePairing_createsANewCollectionWhenPersistingThePairingBoardPeople_toPreventAHibernateSharedReferenceException() {
        Person p1 = new Person("John");
        p1.setId(1L);
        Person p2 = new Person("Mary");
        p2.setId(2L);

        PairingBoard pairingBoard = new PairingBoard("The Pairing Board", false, Arrays.asList(p1, p2), new ArrayList<>());
        pairingBoard.setId(1L);
        List<PairingBoard> pairingBoards = Collections.singletonList(pairingBoard);

        Project project = new Project("One", "onepass", pairingBoards, new ArrayList<>());

        when(mockPairingHistoryRepository.save(any(PairingHistory.class))).thenAnswer(i -> i.getArguments()[0]);

        List<PairingHistory> result = pairingService.savePairing(project);

        assertThat(result.get(0).getPeople(), not(sameInstance(pairingBoard.getPeople())));
    }

    @Test
    public void getRecommendation_callsTheRecommendationService_withTheProjectsLastTwoMonthsOfPairingHistories_andReturnsTheRecommendedProject() {
        Project project = new Project("One", "onepass", new ArrayList<>(), new ArrayList<>());
        PairingHistory pairingHistory = new PairingHistory();
        List<PairingHistory> pairingHistories = Collections.singletonList(pairingHistory);

        Project recommendedProject = new Project("One", "onepass", new ArrayList<>(), new ArrayList<>());

        when(mockPairingHistoryRepository.findByProjectAndTimestampAfterOrderByTimestampDesc(any(Project.class), any(Timestamp.class))).thenReturn(pairingHistories);
        Timestamp mockNow = Timestamp.valueOf("2020-06-30 00:00:00.000000000");
        when(mockCurrentTimeProvider.getCurrentTime()).thenReturn(mockNow);
        when(mockRecommendationService.get(any(Project.class), anyList())).thenReturn(recommendedProject);

        Project returnedProject = pairingService.getRecommendation(project);

        assertThat(returnedProject, equalTo(recommendedProject));

        Timestamp thirtyDaysAgo = Timestamp.valueOf("2020-05-31 00:00:00.000000000");

        verify(mockPairingHistoryRepository).findByProjectAndTimestampAfterOrderByTimestampDesc(project, thirtyDaysAgo);
        verify(mockRecommendationService).get(project, pairingHistories);
    }

    @Test
    public void getSortedPairingHistory_getsThePairingHistoriesForAProject_sortedByMostRecentPairingHistory() {
        Project project = new Project("One", "onepass", new ArrayList<>(), new ArrayList<>());

        List<PairingHistory> pairingHistories = Arrays.asList(
                new PairingHistory(project, "Pairing Board", new ArrayList<>(), new Timestamp(10)),
                new PairingHistory(project, "Pairing Board 2", new ArrayList<>(), new Timestamp(50))
        );

        when(mockPairingHistoryRepository.findByProjectAndTimestampAfterOrderByTimestampDesc(any(Project.class), any(Timestamp.class))).thenReturn(pairingHistories);
        Timestamp mockNow = Timestamp.valueOf("2020-06-30 00:00:00.000000000");
        when(mockCurrentTimeProvider.getCurrentTime()).thenReturn(mockNow);

        List<PairingHistory> result = pairingService.getSortedPairingHistory(project);

        assertThat(result, equalTo(pairingHistories));

        Timestamp thirtyDaysAgo = Timestamp.valueOf("2020-05-31 00:00:00.000000000");
        verify(mockPairingHistoryRepository).findByProjectAndTimestampAfterOrderByTimestampDesc(project, thirtyDaysAgo);
    }
}
