package com.parrit.services;

import com.parrit.entities.PairingHistory;
import com.parrit.entities.Person;
import com.parrit.entities.Space;
import com.parrit.entities.Workspace;
import com.parrit.utilities.CurrentTimeProvider;
import org.apache.commons.lang3.tuple.ImmutablePair;
import org.apache.commons.lang3.tuple.Pair;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class RecommendationService {

    CurrentTimeProvider currentTimeProvider;

    @Autowired
    public RecommendationService(CurrentTimeProvider currentTimeProvider) {
        this.currentTimeProvider = currentTimeProvider;
    }

    private static final int FULL_SPACE_SIZE = 2;

    public Workspace get(Workspace workspace, List<PairingHistory> workspacePairingHistories) {
        List<Person> floatingPeople = workspace.getPeople();
        List<Space> emptySpaces = getEmptySpaces(workspace);
        Map<Person, Space> availablePairs = getAvailablePairsMap(workspace);

        HelpfulDataClass helpfulData = new HelpfulDataClass(floatingPeople.size(), availablePairs.size() - floatingPeople.size());

        if (!availablePairs.isEmpty()) {
            Pair<Long, Map<Person, Person>> bestPairing = new ImmutablePair<>(Long.MAX_VALUE, new HashMap<>());
            Map<Person, List<Pair<Person, Timestamp>>> floatingPersonListMap = getFloatingPeopleListMap(floatingPeople, availablePairs, workspacePairingHistories);

            bestPairing = findBestPermutation(floatingPersonListMap, 0L, new HashMap<>(), bestPairing, helpfulData);

            Map<Person, Person> bestPairingMap = bestPairing.getValue();
            for (Person floatingPerson : bestPairingMap.keySet()) {
                Person personToPairWith = bestPairingMap.get(floatingPerson);
                Space pairSpace = availablePairs.get(personToPairWith);

                /*
                 * Pairing Two Floating People, need an empty space
                 */
                if(pairSpace == null) {
                    pairSpace = emptySpaces.get(0); //TODO: Check if there is an emptySpace, if not add one and use it

                    pairSpace.getPeople().add(floatingPerson);
                    pairSpace.getPeople().add(personToPairWith);
                    floatingPeople.remove(floatingPerson);
                    floatingPeople.remove(personToPairWith);

                    emptySpaces.remove(pairSpace);
                }
                else {
                    pairSpace.getPeople().add(floatingPerson);
                    floatingPeople.remove(floatingPerson);
                }
            }
        }

        while (!floatingPeople.isEmpty()) {
            Person floatingPerson = floatingPeople.remove(0);

            Space emptySpace = emptySpaces.get(0); //TODO: Check if there is an emptySpace, if not add one and use it
            emptySpace.getPeople().add(floatingPerson);

            if (emptySpace.getPeople().size() == FULL_SPACE_SIZE)
                emptySpaces.remove(emptySpace);
        }

        return workspace;
    }

    private Pair<Long, Map<Person, Person>> findBestPermutation(Map<Person, List<Pair<Person, Timestamp>>> theMap, long currentTotal, Map<Person, Person> currentPairing, Pair<Long, Map<Person, Person>> bestPairing, HelpfulDataClass helpfulData) {
        if (theMap.isEmpty()) {
            if (isAValidPairing(currentPairing, helpfulData) && currentTotal < bestPairing.getKey()) {
                bestPairing = new ImmutablePair<>(currentTotal, new HashMap<>(currentPairing));
            }
            return bestPairing;
        }

        Person currentFloatingPerson = theMap.entrySet().iterator().next().getKey();
        List<Pair<Person, Timestamp>> ListOfPairingChoices = theMap.remove(currentFloatingPerson);

        for (Pair<Person, Timestamp> currentPairingChoice : ListOfPairingChoices) {
            List<Pair<Person, Timestamp>> floatingPersonTempList = null;

            if (currentPairing.containsValue(currentPairingChoice.getKey())
                || currentPairing.containsKey(currentPairingChoice.getKey()))
                continue;

            currentTotal += currentPairingChoice.getValue().getTime();
            currentPairing.put(currentFloatingPerson, currentPairingChoice.getKey());

            if(theMap.containsKey(currentPairingChoice.getKey()))
                floatingPersonTempList = theMap.remove(currentPairingChoice.getKey());

            bestPairing = findBestPermutation(theMap, currentTotal, currentPairing, bestPairing, helpfulData);

            if(floatingPersonTempList != null)
                theMap.put(currentPairingChoice.getKey(), floatingPersonTempList);

            currentPairing.remove(currentFloatingPerson);
            currentTotal -= currentPairingChoice.getValue().getTime();
        }

        if(iShouldExcludeMyself(helpfulData)) {
            helpfulData.hasSomeoneBeenExcluded = true;
            bestPairing = findBestPermutation(theMap, currentTotal, currentPairing, bestPairing, helpfulData);
            helpfulData.hasSomeoneBeenExcluded = false;
        }

        theMap.put(currentFloatingPerson, ListOfPairingChoices);

        return bestPairing;
    }

    private boolean isAValidPairing(Map<Person, Person> currentPairing, HelpfulDataClass helpfulData) {
        int numExcessFloating = helpfulData.numTotalFloating - helpfulData.numTotalAvailable;
        int maximumAvailableWeCanPair = Math.min(helpfulData.numTotalFloating, helpfulData.numTotalAvailable);
        return maximumAvailableWeCanPair + (numExcessFloating > 0 ? numExcessFloating/2 : 0) == currentPairing.size();
    }

    private boolean iShouldExcludeMyself(HelpfulDataClass helpfulData) {
        int numTotalExcessFloating = helpfulData.numTotalFloating - helpfulData.numTotalAvailable;
        return numTotalExcessFloating > 0 && numTotalExcessFloating % 2 == 1 && !helpfulData.hasSomeoneBeenExcluded;
    }

    private List<Space> getEmptySpaces(Workspace workspace) {
        return workspace.getSpaces()
                .stream()
                .filter(space -> space.getPeople().isEmpty())
                .collect(Collectors.toList());
    }

    private Map<Person, Space> getAvailablePairsMap(Workspace workspace) {
        Map<Person, Space> availablePairs = new HashMap<>();

        workspace.getSpaces()
                .stream()
                .filter(space -> !space.getPeople().isEmpty() && space.getPeople().size() < FULL_SPACE_SIZE)
                .forEach(space -> availablePairs.put(space.getPeople().get(0), space));

        workspace.getPeople()
                .forEach(floatingPerson -> availablePairs.put(floatingPerson, null));

        return availablePairs;
    }

    private Map<Person, List<Pair<Person, Timestamp>>> getFloatingPeopleListMap(List<Person> floatingPeople, Map<Person, Space> availablePairs, List<PairingHistory> workspacePairingHistories) {
        Map<Person, List<Pair<Person, Timestamp>>> floatingPersonListMap = new HashMap<>();

        for (Person floatingPerson : floatingPeople) {
            List<Pair<Person, Timestamp>> floatingPersonList = new ArrayList<>();

            List<PairingHistory> floatingPersonPairingHistories = getPairingHistoryForPerson(floatingPerson, workspacePairingHistories);

            for (Person availablePerson : availablePairs.keySet()) {

                /*
                 * Don't make a pairing history for yourself
                 */
                if(availablePerson.equals(floatingPerson))
                    continue;

                List<PairingHistory> matchingPairingHistories = getPairingHistoryForPerson(availablePerson, floatingPersonPairingHistories);

                if (matchingPairingHistories.isEmpty()) {
                    floatingPersonList.add(new ImmutablePair<>(availablePerson, new Timestamp(0L)));
                } else {
                    PairingHistory mostRecentPairing = matchingPairingHistories.stream().max(Comparator.comparing(PairingHistory::getTimestamp)).get();
                    floatingPersonList.add(new ImmutablePair<>(availablePerson, mostRecentPairing.getTimestamp()));
                }

            }

            floatingPersonListMap.put(floatingPerson, floatingPersonList);
        }

        return floatingPersonListMap;
    }

    private List<PairingHistory> getPairingHistoryForPerson(Person person, List<PairingHistory> pairingHistories) {
        return pairingHistories
                .stream()
                .filter(pairingHistory -> pairingHistory.getPersonOne().equals(person) || pairingHistory.getPersonTwo().equals(person))
                .collect(Collectors.toList());
    }

    private class HelpfulDataClass {
        public final int numTotalFloating;
        public final int numTotalAvailable;
        public boolean hasSomeoneBeenExcluded;

        public HelpfulDataClass(int floating, int available) {
            this.numTotalFloating = floating;
            this.numTotalAvailable = available;
            this.hasSomeoneBeenExcluded = false;
        }
    }
}
