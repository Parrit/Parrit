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
        Person p1 = new Person();
        p1.setId(1L);
        p1.setName("John");

        Person p2 = new Person();
        p2.setId(2L);
        p2.setName("Mary");

        Space space1 = new Space();
        space1.setId(1L);
        space1.setName("The Space");
        space1.setPeople(Arrays.asList(p1, p2));

        List<Space> spaces = Collections.singletonList(space1);

        Workspace workspace = new Workspace();
        workspace.setId(7L);
        workspace.setSpaces(spaces);

        when(mockWorkspaceRepository.findOne(anyLong())).thenReturn(workspace);

        pairingService.savePairing(7L);

        PairingHistory expectedPairingHistory = new PairingHistory();
        expectedPairingHistory.setWorkspace(workspace);
        expectedPairingHistory.setPersonOne(p1);
        expectedPairingHistory.setPersonTwo(p2);
        expectedPairingHistory.setTimestamp(currentTime);
        expectedPairingHistory.setGroupId(1L);

        verify(mockWorkspaceRepository).findOne(7L);
        verify(mockPairingHistoryRepository).save(eq(expectedPairingHistory));
    }

    @Test
    public void savePairing_createsMultiplePairingHistoriesWithIncrementedGroupIds_whenThereAreMoreThanOneSpaces() {
        Person p1 = new Person();
        p1.setId(1L);
        p1.setName("John");

        Person p2 = new Person();
        p2.setId(2L);
        p2.setName("Mary");

        Person p3 = new Person();
        p1.setId(3L);
        p1.setName("Steve");

        Person p4 = new Person();
        p2.setId(4L);
        p2.setName("Tammy");

        Space space1 = new Space();
        space1.setId(1L);
        space1.setName("The Space");
        space1.setPeople(Arrays.asList(p1, p2));

        Space space2 = new Space();
        space2.setId(1L);
        space2.setName("The Second Space");
        space2.setPeople(Arrays.asList(p3, p4));

        List<Space> spaces = Arrays.asList(space1, space2);

        Workspace workspace = new Workspace();
        workspace.setId(7L);
        workspace.setSpaces(spaces);

        when(mockWorkspaceRepository.findOne(anyLong())).thenReturn(workspace);

        pairingService.savePairing(7L);

        PairingHistory expectedPairingHistory1 = new PairingHistory();
        expectedPairingHistory1.setWorkspace(workspace);
        expectedPairingHistory1.setPersonOne(p1);
        expectedPairingHistory1.setPersonTwo(p2);
        expectedPairingHistory1.setTimestamp(currentTime);
        expectedPairingHistory1.setGroupId(1L);

        PairingHistory expectedPairingHistory2 = new PairingHistory();
        expectedPairingHistory2.setWorkspace(workspace);
        expectedPairingHistory2.setPersonOne(p3);
        expectedPairingHistory2.setPersonTwo(p4);
        expectedPairingHistory2.setTimestamp(currentTime);
        expectedPairingHistory2.setGroupId(2L);

        verify(mockWorkspaceRepository).findOne(7L);
        verify(mockPairingHistoryRepository).save(eq(expectedPairingHistory1));
        verify(mockPairingHistoryRepository).save(eq(expectedPairingHistory2));
    }

    @Test
    public void savePairing_createsMultiplePairingHistoriesWithSameGroupId_whenSpaceHasMoreThanTwoPeople() {
        Person p1 = new Person();
        p1.setId(1L);
        p1.setName("John");

        Person p2 = new Person();
        p2.setId(2L);
        p2.setName("Mary");

        Person p3 = new Person();
        p1.setId(3L);
        p1.setName("Steve");

        Space space1 = new Space();
        space1.setId(1L);
        space1.setName("The Space");
        space1.setPeople(Arrays.asList(p1, p2, p3));

        List<Space> spaces = Collections.singletonList(space1);

        Workspace workspace = new Workspace();
        workspace.setId(7L);
        workspace.setSpaces(spaces);

        when(mockWorkspaceRepository.findOne(anyLong())).thenReturn(workspace);

        pairingService.savePairing(7L);

        PairingHistory expectedPairingHistory1 = new PairingHistory();
        expectedPairingHistory1.setWorkspace(workspace);
        expectedPairingHistory1.setPersonOne(p1);
        expectedPairingHistory1.setPersonTwo(p2);
        expectedPairingHistory1.setTimestamp(currentTime);
        expectedPairingHistory1.setGroupId(1L);

        PairingHistory expectedPairingHistory2 = new PairingHistory();
        expectedPairingHistory2.setWorkspace(workspace);
        expectedPairingHistory2.setPersonOne(p1);
        expectedPairingHistory2.setPersonTwo(p3);
        expectedPairingHistory2.setTimestamp(currentTime);
        expectedPairingHistory2.setGroupId(1L);

        PairingHistory expectedPairingHistory3 = new PairingHistory();
        expectedPairingHistory3.setWorkspace(workspace);
        expectedPairingHistory3.setPersonOne(p2);
        expectedPairingHistory3.setPersonTwo(p3);
        expectedPairingHistory3.setTimestamp(currentTime);
        expectedPairingHistory3.setGroupId(1L);

        verify(mockWorkspaceRepository).findOne(7L);
        verify(mockPairingHistoryRepository).save(eq(expectedPairingHistory1));
        verify(mockPairingHistoryRepository).save(eq(expectedPairingHistory2));
        verify(mockPairingHistoryRepository).save(eq(expectedPairingHistory3));
    }

    @Test
    public void getRecommendation_getsTheWorkspaceAndItsPairingHistory_andCallsTheRecommendationService() {
        Workspace workspace = new Workspace();
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
        Workspace workspace = new Workspace();
        PairingHistory pairingHistory = new PairingHistory();
        List<PairingHistory> pairingHistories = Collections.singletonList(pairingHistory);

        Workspace recommendedWorkspace = new Workspace();
        recommendedWorkspace.setId(9001L);

        when(mockWorkspaceRepository.findOne(anyLong())).thenReturn(workspace);
        when(mockPairingHistoryRepository.findByWorkspace(any(Workspace.class))).thenReturn(pairingHistories);
        when(mockRecommendationService.get(any(Workspace.class), anyListOf(PairingHistory.class))).thenReturn(recommendedWorkspace);

        Workspace returnedWorkspace = pairingService.getRecommendation(77L);

        assertThat(returnedWorkspace, equalTo(recommendedWorkspace));

        verify(mockWorkspaceRepository).save(recommendedWorkspace);
    }
}