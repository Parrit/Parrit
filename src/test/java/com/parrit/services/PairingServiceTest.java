package com.parrit.services;

import com.parrit.entities.PairingBoard;
import com.parrit.entities.PairingHistory;
import com.parrit.entities.Person;
import com.parrit.entities.Project;
import com.parrit.repositories.PairingHistoryRepository;
import com.parrit.repositories.ProjectRepository;
import com.parrit.utilities.CurrentTimeProvider;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.Mock;
import org.mockito.junit.MockitoJUnitRunner;

import java.sql.Timestamp;
import java.util.*;

import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.Matchers.equalTo;
import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.*;

@RunWith(MockitoJUnitRunner.class)
public class PairingServiceTest {

    private PairingService pairingService;

    @Mock
    private PairingHistoryRepository mockPairingHistoryRepository;

    @Mock
    private ProjectRepository mockProjectRepository;

    @Mock
    private RecommendationService mockRecommendationService;

    @Mock
    private CurrentTimeProvider mockCurrentTimeProvider;

    private Timestamp currentTime = new Timestamp(1456364985548L);

    @Before
    public void setup() {
        pairingService = new PairingService(mockPairingHistoryRepository, mockProjectRepository, mockRecommendationService,
                mockCurrentTimeProvider);

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

        PairingHistory expectedPairingHistory = new PairingHistory(project, "The Pairing Board", Arrays.asList(p1, p2), currentTime);

        when(mockProjectRepository.findById(anyLong())).thenReturn(Optional.of(project));
        when(mockPairingHistoryRepository.save(expectedPairingHistory)).thenReturn(expectedPairingHistory);

        List<PairingHistory> result = pairingService.savePairing(7L);

        assertThat(result, equalTo(Collections.singletonList(expectedPairingHistory)));

        verify(mockProjectRepository).findById(7L);
        verify(mockPairingHistoryRepository).save(eq(expectedPairingHistory));
        verify(mockCurrentTimeProvider, times(1)).getCurrentTime();
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

        PairingHistory expectedPairingHistory1 = new PairingHistory(project, "The Pairing Board", Arrays.asList(p1, p2), currentTime);
        PairingHistory expectedPairingHistory2 = new PairingHistory(project, "The Second Pairing Board", Arrays.asList(p3, p4), currentTime);

        when(mockProjectRepository.findById(anyLong())).thenReturn(Optional.of(project));
        when(mockPairingHistoryRepository.save(expectedPairingHistory1)).thenReturn(expectedPairingHistory1);
        when(mockPairingHistoryRepository.save(expectedPairingHistory2)).thenReturn(expectedPairingHistory2);

        List<PairingHistory> result = pairingService.savePairing(7L);

        assertThat(result, equalTo(Arrays.asList(expectedPairingHistory1, expectedPairingHistory2)));

        verify(mockProjectRepository).findById(7L);
        verify(mockPairingHistoryRepository).save(eq(expectedPairingHistory1));
        verify(mockPairingHistoryRepository).save(eq(expectedPairingHistory2));
        verify(mockCurrentTimeProvider, times(1)).getCurrentTime();
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

        PairingHistory expectedPairingHistory = new PairingHistory(project, "The Pairing Board", Arrays.asList(p1, p2, p3), currentTime);

        when(mockProjectRepository.findById(anyLong())).thenReturn(Optional.of(project));
        when(mockPairingHistoryRepository.save(expectedPairingHistory)).thenReturn(expectedPairingHistory);

        List<PairingHistory> result = pairingService.savePairing(7L);

        assertThat(result, equalTo(Collections.singletonList(expectedPairingHistory)));

        verify(mockProjectRepository).findById(7L);
        verify(mockPairingHistoryRepository).save(eq(expectedPairingHistory));
        verify(mockCurrentTimeProvider, times(1)).getCurrentTime();
    }
    
    @Test
    public void savePairing_createsAPairingHistory_whenThereIsOnlyOnePersonInAPairingBoard() {
        Person p1 = new Person("John");
        p1.setId(1L);

        PairingBoard pairingBoard = new PairingBoard("The Pairing Board", false, Collections.singletonList(p1), new ArrayList<>());
        pairingBoard.setId(1L);

        List<PairingBoard> pairingBoards = Collections.singletonList(pairingBoard);

        Project project = new Project("One", "onepass", pairingBoards, new ArrayList<>());

        PairingHistory expectedPairingHistory = new PairingHistory(project,  "The Pairing Board", Collections.singletonList(p1), currentTime);

        when(mockProjectRepository.findById(anyLong())).thenReturn(Optional.of(project));
        when(mockPairingHistoryRepository.save(expectedPairingHistory)).thenReturn(expectedPairingHistory);

        List<PairingHistory> result = pairingService.savePairing(7L);

        assertThat(result, equalTo(Collections.singletonList(expectedPairingHistory)));

        verify(mockProjectRepository).findById(7L);
        verify(mockPairingHistoryRepository).save(eq(expectedPairingHistory));
        verify(mockCurrentTimeProvider, times(1)).getCurrentTime();
    }

    @Test
    public void savePairing_doesNotCreateAPairingHistory_whenThereIsNoOneInAPairingBoard() {
        PairingBoard pairingBoard = new PairingBoard("The Pairing Board", false, Collections.emptyList(), new ArrayList<>());
        pairingBoard.setId(1L);

        List<PairingBoard> pairingBoards = Collections.singletonList(pairingBoard);

        Project project = new Project("One", "onepass", pairingBoards, new ArrayList<>());

        when(mockProjectRepository.findById(anyLong())).thenReturn(Optional.of(project));

        List<PairingHistory> result = pairingService.savePairing(7L);
        assertThat(result, equalTo(Collections.emptyList()));

        verify(mockProjectRepository).findById(7L);
        verifyZeroInteractions(mockPairingHistoryRepository);
        verify(mockCurrentTimeProvider, times(1)).getCurrentTime();
    }

    @Test
    public void getRecommendation_getsTheProjectAndItsPairingHistory_andCallsTheRecommendationService() {
        Project project = new Project("One", "onepass", new ArrayList<>(), new ArrayList<>());
        PairingHistory pairingHistory = new PairingHistory();
        List<PairingHistory> pairingHistories = Collections.singletonList(pairingHistory);

        when(mockProjectRepository.findById(anyLong())).thenReturn(Optional.of(project));
        when(mockPairingHistoryRepository.findByProject(any(Project.class))).thenReturn(pairingHistories);

        pairingService.getRecommendation(77L);

        verify(mockProjectRepository).findById(77L);
        verify(mockPairingHistoryRepository).findByProject(project);
        verify(mockRecommendationService).get(project, pairingHistories);
    }

    @Test
    public void getRecommendation_persistsTheResultFromTheRecommendationService_andReturnsTheProject() {
        Project project = new Project("One", "onepass", new ArrayList<>(), new ArrayList<>());
        PairingHistory pairingHistory = new PairingHistory();
        List<PairingHistory> pairingHistories = Collections.singletonList(pairingHistory);

        Project recommendedProject = new Project("One", "onepass", new ArrayList<>(), new ArrayList<>());

        when(mockProjectRepository.findById(anyLong())).thenReturn(Optional.of(project));
        when(mockPairingHistoryRepository.findByProject(any(Project.class))).thenReturn(pairingHistories);
        when(mockRecommendationService.get(any(Project.class), anyList())).thenReturn(recommendedProject);

        Project returnedProject = pairingService.getRecommendation(77L);

        assertThat(returnedProject, equalTo(recommendedProject));

        verify(mockProjectRepository).save(recommendedProject);
    }

    @Test
    public void getSortedPairingHistory_getsThePairingHistoriesForAProject_sortedByMostRecentPairingHistory() {
        Project project = new Project("One", "onepass", new ArrayList<>(), new ArrayList<>());

        List<PairingHistory> pairingHistories = Arrays.asList(
            new PairingHistory(project, "Pairing Board", new ArrayList<>(), new Timestamp(10)),
            new PairingHistory(project, "Pairing Board 2", new ArrayList<>(), new Timestamp(50))
        );

        when(mockProjectRepository.findById(anyLong())).thenReturn(Optional.of(project));
        when(mockPairingHistoryRepository.findByProjectOrderByTimestampDesc(any(Project.class))).thenReturn(pairingHistories);

        List<PairingHistory> result = pairingService.getSortedPairingHistory(7L);

        assertThat(result, equalTo(pairingHistories));

        verify(mockProjectRepository).findById(7L);
        verify(mockPairingHistoryRepository).findByProjectOrderByTimestampDesc(project);
    }
}
