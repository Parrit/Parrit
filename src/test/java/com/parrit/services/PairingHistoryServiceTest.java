package com.parrit.services;

import com.parrit.entities.PairingHistory;
import com.parrit.entities.Person;
import com.parrit.entities.Space;
import com.parrit.entities.Workspace;
import com.parrit.repositories.PairingHistoryRepository;
import com.parrit.support.MockitoTestBase;
import com.parrit.utilities.CurrentTimeProvider;
import org.junit.Before;
import org.junit.Test;
import org.mockito.Mock;

import java.sql.Timestamp;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;

import static org.mockito.Matchers.eq;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

public class PairingHistoryServiceTest extends MockitoTestBase {

    @Mock
    PairingHistoryRepository mockPairingHistoryRepository;

    @Mock
    CurrentTimeProvider mockCurrentTimeProvider;

    PairingHistoryService pairingHistoryService;

    Timestamp currentTime = new Timestamp(1456364985548L);

    @Before
    public void setup() {
        pairingHistoryService = new PairingHistoryService(mockPairingHistoryRepository, mockCurrentTimeProvider);

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
        workspace.setSpaces(spaces);

        pairingHistoryService.savePairing(workspace);

        PairingHistory expectedPairingHistory = new PairingHistory();
        expectedPairingHistory.setPersonOne(p1);
        expectedPairingHistory.setPersonTwo(p2);
        expectedPairingHistory.setTimestamp(currentTime);
        expectedPairingHistory.setGroupId(1L);

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
        workspace.setSpaces(spaces);

        pairingHistoryService.savePairing(workspace);

        PairingHistory expectedPairingHistory1 = new PairingHistory();
        expectedPairingHistory1.setPersonOne(p1);
        expectedPairingHistory1.setPersonTwo(p2);
        expectedPairingHistory1.setTimestamp(currentTime);
        expectedPairingHistory1.setGroupId(1L);

        PairingHistory expectedPairingHistory2 = new PairingHistory();
        expectedPairingHistory2.setPersonOne(p3);
        expectedPairingHistory2.setPersonTwo(p4);
        expectedPairingHistory2.setTimestamp(currentTime);
        expectedPairingHistory2.setGroupId(2L);

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
        workspace.setSpaces(spaces);

        pairingHistoryService.savePairing(workspace);

        PairingHistory expectedPairingHistory1 = new PairingHistory();
        expectedPairingHistory1.setPersonOne(p1);
        expectedPairingHistory1.setPersonTwo(p2);
        expectedPairingHistory1.setTimestamp(currentTime);
        expectedPairingHistory1.setGroupId(1L);

        PairingHistory expectedPairingHistory2 = new PairingHistory();
        expectedPairingHistory2.setPersonOne(p1);
        expectedPairingHistory2.setPersonTwo(p3);
        expectedPairingHistory2.setTimestamp(currentTime);
        expectedPairingHistory2.setGroupId(1L);

        PairingHistory expectedPairingHistory3 = new PairingHistory();
        expectedPairingHistory3.setPersonOne(p2);
        expectedPairingHistory3.setPersonTwo(p3);
        expectedPairingHistory3.setTimestamp(currentTime);
        expectedPairingHistory3.setGroupId(1L);

        verify(mockPairingHistoryRepository).save(eq(expectedPairingHistory1));
        verify(mockPairingHistoryRepository).save(eq(expectedPairingHistory2));
        verify(mockPairingHistoryRepository).save(eq(expectedPairingHistory3));
    }
}