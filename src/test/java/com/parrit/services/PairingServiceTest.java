package com.parrit.services;

import com.parrit.entities.PairingHistory;
import com.parrit.entities.Person;
import com.parrit.entities.Space;
import com.parrit.entities.Workspace;
import com.parrit.repositories.PairingHistoryRepository;
import com.parrit.repositories.WorkspaceRepository;
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
import static org.mockito.Matchers.*;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

public class PairingServiceTest extends MockitoTestBase {

    @Mock
    PairingHistoryRepository mockPairingHistoryRepository;

    @Mock
    WorkspaceRepository mockWorkspaceRepository;

    @Mock
    RecommendationService mockRecommendationService;

    @Mock
    CurrentTimeProvider mockCurrentTimeProvider;

    PairingService pairingService;

    Timestamp currentTime = new Timestamp(1456364985548L);

    @Before
    public void setup() {
        pairingService = new PairingService(mockPairingHistoryRepository, mockWorkspaceRepository, mockRecommendationService,
                mockCurrentTimeProvider);

        when(mockCurrentTimeProvider.getCurrentTime()).thenReturn(currentTime);
    }

    @Test
    public void savePairing_createsAPairingHistory_andPersistsIt() {
        Person p1 = new Person(1L, "John");
        Person p2 = new Person(2L, "Mary");

        Space space1 = new Space(1L, Arrays.asList(p1, p2), "The Space");
        List<Space> spaces = Collections.singletonList(space1);

        Workspace workspace = new Workspace("One", spaces, new ArrayList<>());

        when(mockWorkspaceRepository.findOne(anyLong())).thenReturn(workspace);

        pairingService.savePairing(7L);

        PairingHistory expectedPairingHistory = new PairingHistory(workspace, p1, p2, currentTime, 1L);

        verify(mockWorkspaceRepository).findOne(7L);
        verify(mockPairingHistoryRepository).save(eq(expectedPairingHistory));
    }

    @Test
    public void savePairing_createsMultiplePairingHistoriesWithIncrementedGroupIds_whenThereAreMoreThanOneSpaces() {
        Person p1 = new Person(1L, "John");
        Person p2 = new Person(2L, "Mary");
        Person p3 = new Person(3L, "Steve");
        Person p4 = new Person(4L, "Tammy");

        Space space1 = new Space(1L, Arrays.asList(p1, p2), "The Space");
        Space space2 = new Space(1L, Arrays.asList(p3, p4), "The Second Space");

        List<Space> spaces = Arrays.asList(space1, space2);

        Workspace workspace = new Workspace("One", spaces, new ArrayList<>());

        when(mockWorkspaceRepository.findOne(anyLong())).thenReturn(workspace);

        pairingService.savePairing(7L);

        PairingHistory expectedPairingHistory1 = new PairingHistory(workspace, p1, p2, currentTime, 1L);
        PairingHistory expectedPairingHistory2 = new PairingHistory(workspace, p3, p4, currentTime, 2L);

        verify(mockWorkspaceRepository).findOne(7L);
        verify(mockPairingHistoryRepository).save(eq(expectedPairingHistory1));
        verify(mockPairingHistoryRepository).save(eq(expectedPairingHistory2));
    }

    @Test
    public void savePairing_createsMultiplePairingHistoriesWithSameGroupId_whenSpaceHasMoreThanTwoPeople() {
        Person p1 = new Person(1L, "John");
        Person p2 = new Person(2L, "Mary");
        Person p3 = new Person(3L, "Steve");

        Space space1 = new Space(1L, Arrays.asList(p1, p2, p3), "The Space");

        List<Space> spaces = Collections.singletonList(space1);

        Workspace workspace = new Workspace("One", spaces, new ArrayList<>());

        when(mockWorkspaceRepository.findOne(anyLong())).thenReturn(workspace);

        pairingService.savePairing(7L);

        PairingHistory expectedPairingHistory1 = new PairingHistory(workspace, p1, p2, currentTime, 1L);
        PairingHistory expectedPairingHistory2 = new PairingHistory(workspace, p1, p3, currentTime, 1L);
        PairingHistory expectedPairingHistory3 = new PairingHistory(workspace, p2, p3, currentTime, 1L);

        verify(mockWorkspaceRepository).findOne(7L);
        verify(mockPairingHistoryRepository).save(eq(expectedPairingHistory1));
        verify(mockPairingHistoryRepository).save(eq(expectedPairingHistory2));
        verify(mockPairingHistoryRepository).save(eq(expectedPairingHistory3));
    }

    @Test
    public void getRecommendation_getsTheWorkspaceAndItsPairingHistory_andCallsTheRecommendationService() {
        Workspace workspace = new Workspace("One", new ArrayList<>(), new ArrayList<>());
        PairingHistory pairingHistory = new PairingHistory();
        List<PairingHistory> pairingHistories = Collections.singletonList(pairingHistory);

        when(mockWorkspaceRepository.findOne(anyLong())).thenReturn(workspace);
        when(mockPairingHistoryRepository.findByWorkspace(any(Workspace.class))).thenReturn(pairingHistories);

        pairingService.getRecommendation(77L);

        verify(mockWorkspaceRepository).findOne(77L);
        verify(mockPairingHistoryRepository).findByWorkspace(workspace);
        verify(mockRecommendationService).get(workspace, pairingHistories);
    }

    @Test
    public void getRecommendation_persistsTheResultFromTheRecommendationService_andReturnsTheWorkspace() {
        Workspace workspace = new Workspace("One", new ArrayList<>(), new ArrayList<>());
        PairingHistory pairingHistory = new PairingHistory();
        List<PairingHistory> pairingHistories = Collections.singletonList(pairingHistory);

        Workspace recommendedWorkspace = new Workspace("One", new ArrayList<>(), new ArrayList<>());

        when(mockWorkspaceRepository.findOne(anyLong())).thenReturn(workspace);
        when(mockPairingHistoryRepository.findByWorkspace(any(Workspace.class))).thenReturn(pairingHistories);
        when(mockRecommendationService.get(any(Workspace.class), anyListOf(PairingHistory.class))).thenReturn(recommendedWorkspace);

        Workspace returnedWorkspace = pairingService.getRecommendation(77L);

        assertThat(returnedWorkspace, equalTo(recommendedWorkspace));

        verify(mockWorkspaceRepository).save(recommendedWorkspace);
    }
}