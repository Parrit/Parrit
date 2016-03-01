package com.parrit.services;

import com.parrit.entities.PairingHistory;
import com.parrit.entities.Person;
import com.parrit.entities.Space;
import com.parrit.entities.Workspace;
import com.parrit.utilities.CurrentTimeProvider;
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
        Map<Person, Space> availablePairs = getAvailablePairsMap(workspace);

        while (!floatingPeople.isEmpty()) {
            Person floatingPerson = floatingPeople.remove(0);

            List<PairingHistory> floatingPersonPairingHistories = getPairingHistoryForPerson(floatingPerson, workspacePairingHistories);

            Space spaceToInsert = getSpaceToInsertCurrentPersonInto(workspace.getSpaces(), floatingPersonPairingHistories, availablePairs);

            spaceToInsert.getPeople().add(floatingPerson);
        }

        return workspace;
    }

    private Map<Person, Space> getAvailablePairsMap(Workspace workspace) {
        Map<Person, Space> availablePairs = new HashMap<>();

        workspace.getSpaces()
                .stream()
                .filter(space -> !space.getPeople().isEmpty() && space.getPeople().size() < FULL_SPACE_SIZE)
                .forEach(space -> availablePairs.put(space.getPeople().get(0), space));

        return availablePairs;
    }

    private List<PairingHistory> getPairingHistoryForPerson(Person person, List<PairingHistory> pairingHistories) {
        return pairingHistories
                .stream()
                .filter(pairingHistory -> pairingHistory.getPersonOne().getId() == person.getId() || pairingHistory.getPersonTwo().getId() == person.getId())
                .collect(Collectors.toList());
    }

    private Space getSpaceToInsertCurrentPersonInto(List<Space> allSpaces, List<PairingHistory> floatingPersonPairingHistories, Map<Person, Space> availablePairs) {
        if (!availablePairs.isEmpty()) {
            Timestamp earliestPairingTime = currentTimeProvider.getCurrentTime();
            Optional<Person> earliestPairingPerson = Optional.empty();

            for (Person availablePerson : availablePairs.keySet()) {
                List<PairingHistory> matchingPairingHistories = getPairingHistoryForPerson(availablePerson, floatingPersonPairingHistories);

                if(matchingPairingHistories.isEmpty()) {
                    return availablePairs.remove(availablePerson);
                }

                PairingHistory mostRecentPairing = matchingPairingHistories.stream().max(Comparator.comparing(PairingHistory::getTimestamp)).get();

                if(mostRecentPairing.getTimestamp().before(earliestPairingTime)) {
                    earliestPairingPerson = Optional.of(availablePerson);
                    earliestPairingTime = mostRecentPairing.getTimestamp();
                }
            }

            if(earliestPairingPerson.isPresent()) {
                return availablePairs.remove(earliestPairingPerson.get());
            }
        }

        for (Space space : allSpaces) {
            if (space.getPeople().size() < FULL_SPACE_SIZE) {
                return space;
            }
        }

        return allSpaces.get(0);
    }
}
