package com.parrit.services;

import com.parrit.entities.*;
import com.parrit.repositories.PairingHistoryRepository;
import com.parrit.utilities.CurrentTimeProvider;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Set;

import static java.util.Collections.emptyList;
import static java.util.Collections.singletonList;
import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.Matchers.*;
import static org.mockito.Mockito.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class PairingServiceTest {

    private PairingService pairingService;

    @Mock
    private PairingHistoryRepository mockPairingHistoryRepository;

    @Mock
    private CurrentTimeProvider mockCurrentTimeProvider;

    private final Timestamp currentTime = new Timestamp(1456364985548L);

    @BeforeEach
    public void setup() {
        pairingService = new PairingService(mockPairingHistoryRepository, mockCurrentTimeProvider);

        when(mockCurrentTimeProvider.getCurrentTime()).thenReturn(currentTime);
    }

    @Nested
    class SavePairing {
        @Test
        public void savePairing_createsAPairingHistory_andPersistsIt() {
            Person p1 = Person.builder().name("John").id(1L).build();
            Person p2 = Person.builder().name("Mary").id(2L).build();

            PairingBoard pairingBoard = new PairingBoard("The Pairing Board", false, List.of(p1, p2), new ArrayList<>());
            pairingBoard.setId(1L);
            List<PairingBoard> pairingBoards = singletonList(pairingBoard);

            Project project = new Project("One", "onepass", pairingBoards, new ArrayList<>());

            when(mockPairingHistoryRepository.save(any(PairingHistory.class))).thenAnswer(i -> i.getArguments()[0]);

            pairingService.savePairing(project);

            PairingHistory expectedPairingHistory = new PairingHistory(project, "The Pairing Board", List.of(p1, p2), currentTime);

            verify(mockPairingHistoryRepository).save(expectedPairingHistory);
        }

        @Test
        public void savePairing_createsMultiplePairingHistoriesWithDifferentPairingBoardNames_whenThereAreMoreThanOnePairingBoards() {
            Person p1 = Person.builder().name("John").id(1L).build();
            Person p2 = Person.builder().name("Mary").id(2L).build();
            Person p3 = Person.builder().name("Steve").id(3L).build();
            Person p4 = Person.builder().name("Tammy").id(4L).build();

            PairingBoard pairingBoard1 = new PairingBoard("The Pairing Board", false, List.of(p1, p2), new ArrayList<>());
            pairingBoard1.setId(1L);
            PairingBoard pairingBoard2 = new PairingBoard("The Second Pairing Board", false, List.of(p3, p4), new ArrayList<>());
            pairingBoard2.setId(2L);

            List<PairingBoard> pairingBoards = List.of(pairingBoard1, pairingBoard2);

            Project project = new Project("One", "onepass", pairingBoards, new ArrayList<>());

            when(mockPairingHistoryRepository.save(any(PairingHistory.class))).thenAnswer(i -> i.getArguments()[0]);

            pairingService.savePairing(project);

            PairingHistory expectedPairingHistory1 = new PairingHistory(project, "The Pairing Board", Arrays.asList(p1, p2), currentTime);
            PairingHistory expectedPairingHistory2 = new PairingHistory(project, "The Second Pairing Board", Arrays.asList(p3, p4), currentTime);

            verify(mockPairingHistoryRepository).save(expectedPairingHistory1);
            verify(mockPairingHistoryRepository).save(expectedPairingHistory2);
        }

        @Test
        public void savePairing_createsMultiplePairingHistoriesWithSamePairingBoardName_whenAPairingBoardHasMoreThanTwoPeople() {
            Person p1 = Person.builder().name("John").id(1L).build();
            Person p2 = Person.builder().name("Mary").id(2L).build();
            Person p3 = Person.builder().name("Steve").id(3L).build();

            PairingBoard pairingBoard = new PairingBoard("The Pairing Board", false, Arrays.asList(p1, p2, p3), new ArrayList<>());
            pairingBoard.setId(1L);

            List<PairingBoard> pairingBoards = singletonList(pairingBoard);

            Project project = new Project("One", "onepass", pairingBoards, new ArrayList<>());

            when(mockPairingHistoryRepository.save(any(PairingHistory.class))).thenAnswer(i -> i.getArguments()[0]);

            pairingService.savePairing(project);

            PairingHistory expectedPairingHistory = new PairingHistory(project, "The Pairing Board", List.of(p1, p2, p3), currentTime);

            verify(mockPairingHistoryRepository).save(expectedPairingHistory);
        }

        @Test
        public void savePairing_createsAPairingHistory_whenThereIsOnlyOnePersonInAPairingBoard() {
            Person p1 = Person.builder().name("John").id(1L).build();

            PairingBoard pairingBoard = new PairingBoard("The Pairing Board", false, singletonList(p1), new ArrayList<>());
            pairingBoard.setId(1L);

            List<PairingBoard> pairingBoards = singletonList(pairingBoard);

            Project project = new Project("One", "onepass", pairingBoards, new ArrayList<>());

            when(mockPairingHistoryRepository.save(any(PairingHistory.class))).thenAnswer(i -> i.getArguments()[0]);

            pairingService.savePairing(project);

            PairingHistory expectedPairingHistory = new PairingHistory(project, "The Pairing Board", singletonList(p1), currentTime);

            verify(mockPairingHistoryRepository).save(expectedPairingHistory);
        }

        @Test
        public void savePairing_doesNotCreateAPairingHistory_whenThereIsNoOneInAPairingBoard() {
            PairingBoard pairingBoard = new PairingBoard("The Pairing Board", false, emptyList(), new ArrayList<>());
            pairingBoard.setId(1L);

            List<PairingBoard> pairingBoards = singletonList(pairingBoard);

            Project project = new Project("One", "onepass", pairingBoards, new ArrayList<>());

            pairingService.savePairing(project);

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
            List<PairingBoard> pairingBoards = singletonList(pairingBoard);

            Project project = new Project("One", "onepass", pairingBoards, new ArrayList<>());

            when(mockPairingHistoryRepository.save(any(PairingHistory.class))).thenAnswer(i -> i.getArguments()[0]);

            pairingService.savePairing(project);

            ArgumentCaptor<PairingHistory> pairingHistoryArgumentCaptor = ArgumentCaptor.forClass(PairingHistory.class);
            verify(mockPairingHistoryRepository).save(pairingHistoryArgumentCaptor.capture());
            PairingHistory savedPairingHistory = pairingHistoryArgumentCaptor.getValue();
            assertThat(savedPairingHistory.getPeople(), not(sameInstance(pairingBoard.getPeople())));
        }
    }

    @Test
    public void getSortedPairingHistory_getsThePairingHistoriesForAProject_sortedByMostRecentPairingHistory() {
        Project project = new Project("One", "onepass", new ArrayList<>(), new ArrayList<>());

        List<PairingArrangement> arrangements = List.of(
                PairingArrangement.builder()
                        .pairingTime(new Timestamp(50))
                        .pairingHistories(Set.of(new PairingHistory(project, "Pairing Board", emptyList(), new Timestamp(10))))
                        .project(project)
                        .build(),
                PairingArrangement.builder()
                        .pairingTime(new Timestamp(10))
                        .pairingHistories(Set.of(new PairingHistory(project, "Pairing Board 2", emptyList(), new Timestamp(50))))
                        .project(project)
                        .build()
        );

        when(mockPairingHistoryRepository.findByProjectAndTimestampAfterOrderByTimestampDesc(any(Project.class), any(Timestamp.class))).thenReturn(arrangements);
        Timestamp mockNow = Timestamp.valueOf("2020-06-30 00:00:00.000000000");
        when(mockCurrentTimeProvider.getCurrentTime()).thenReturn(mockNow);

        List<PairingArrangement> result = pairingService.getSortedPairingHistory(project);

        assertThat(result, equalTo(arrangements));

        Timestamp thirtyDaysAgo = Timestamp.valueOf("2020-05-31 00:00:00.000000000");
        verify(mockPairingHistoryRepository).findByProjectAndTimestampAfterOrderByTimestampDesc(project, thirtyDaysAgo);
    }
}
