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

    public Workspace get(Workspace workspace, List<PairingHistory> workspacePairingHistories) {
        PairRecommendationHelper recHelper = new PairRecommendationHelper(workspace, workspacePairingHistories);
        List<Space> emptySpaces = getEmptySpaces(workspace);

        if (recHelper.canAPairingBeMade()) {

            findBestPairing(recHelper);

            Map<Person, Person> bestPairingMap = recHelper.getBestPairingMap();
            for (Person floatingPerson : bestPairingMap.keySet()) {
                Person personToPairWith = bestPairingMap.get(floatingPerson);
                Space pairSpace = recHelper.getSpaceForAvailabelPerson(personToPairWith);

                /*
                 * Pairing two Floating People in an empty space
                 */
                if (pairSpace == null) {
                    pairSpace = emptySpaces.get(0); //TODO: Check if there is an emptySpace, if not add one and use it

                    pairSpace.getPeople().add(floatingPerson);
                    pairSpace.getPeople().add(personToPairWith);
                    workspace.getPeople().remove(floatingPerson);
                    workspace.getPeople().remove(personToPairWith);
                    recHelper.removeFloatingPerson(floatingPerson);
                    recHelper.removeFloatingPerson(personToPairWith);

                    emptySpaces.remove(pairSpace);
                } else {
                    pairSpace.getPeople().add(floatingPerson);
                    workspace.getPeople().remove(floatingPerson);
                    recHelper.removeFloatingPerson(floatingPerson);
                }
            }
        }

        /*
         *  Handle Left Over People
         */
        if (recHelper.hasSoloPerson()) {
            Person soloPerson = recHelper.getSoloPerson();

            Space emptySpace = emptySpaces.get(0); //TODO: Check if there is an emptySpace, if not add one and use it
            emptySpace.getPeople().add(soloPerson);
            workspace.getPeople().remove(soloPerson);
        }

        return workspace;
    }

    private void findBestPairing(PairRecommendationHelper recHelper) {
        if (!recHelper.canAPairingBeMade()) {
            if(recHelper.isCurrentPairingValid()) {
                recHelper.updateBestPairing();
            }
            return;
        }

        Person currentFloatingPerson = recHelper.getNextFloatingPerson();
        List<Pair<Person, Timestamp>> ListOfPairingChoices = recHelper.getPairingChoicesForFloatingPerson(currentFloatingPerson);

        for (Pair<Person, Timestamp> currentPairingChoiceWithTime : ListOfPairingChoices) {
            if (!recHelper.canPersonBePairedWith(currentPairingChoiceWithTime.getKey()))
                continue;

            recHelper.pairFloatingPersonWith(currentFloatingPerson, currentPairingChoiceWithTime);

            findBestPairing(recHelper);

            recHelper.unpairFloatingPersonWith(currentFloatingPerson, currentPairingChoiceWithTime);
        }

        recHelper.putFloatingPersonBack(currentFloatingPerson);

        if(recHelper.canExcludeMySelf(currentFloatingPerson)) {
            recHelper.excludeFloatingPerson(currentFloatingPerson);
            findBestPairing(recHelper);
            recHelper.includeFloatingPerson(currentFloatingPerson);
        }
    }

    private List<Space> getEmptySpaces(Workspace workspace) {
        return workspace.getSpaces()
                .stream()
                .filter(space -> space.getPeople().isEmpty())
                .collect(Collectors.toList());
    }

    private class PairRecommendationHelper {
        private static final int FULL_SPACE_SIZE = 2;

        private final List<Person> initialFloatingPeople;
        private final List<Person> initialUnpairedStickingPeople;

        private List<Person> currentFloatingPeople;
        private List<Person> currentUnpairedStickingPeople;

        private final Map<Person, Space> availablePersonToSpaceMap;
        private final Map<Person, List<Pair<Person, Timestamp>>> floatingPeoplePairChoiceMap;

        private long bestPairingCostTotal;
        private Map<Person, Person> bestPairingMap;

        private long currentPairingCost;
        private Map<Person, Person> currentPairingMap;

        private boolean hasSomeoneBeenExcluded;

        public PairRecommendationHelper(Workspace workspace, List<PairingHistory> workspacePairingHistories) {
            initialFloatingPeople = new ArrayList<>(workspace.getPeople());
            initialUnpairedStickingPeople = new ArrayList<>(getUnpairedStickingPeople(workspace));

            currentFloatingPeople = new ArrayList<>(initialFloatingPeople);
            currentUnpairedStickingPeople = new ArrayList<>(initialUnpairedStickingPeople);

            availablePersonToSpaceMap = getAvailablePairsMap(workspace);
            floatingPeoplePairChoiceMap = getFloatingPeoplePairChoiceMap(initialFloatingPeople, availablePersonToSpaceMap, workspacePairingHistories);

            bestPairingCostTotal = Long.MAX_VALUE;
            bestPairingMap = new HashMap<>();

            currentPairingCost = 0L;
            currentPairingMap = new HashMap<>();

            hasSomeoneBeenExcluded = false;
        }

        private List<Person> getUnpairedStickingPeople(Workspace workspace) {
            return workspace.getSpaces()
                    .stream()
                    .filter(space -> !space.getPeople().isEmpty() && space.getPeople().size() < FULL_SPACE_SIZE)
                    .map(space -> space.getPeople().get(0))
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

        private Map<Person, List<Pair<Person, Timestamp>>> getFloatingPeoplePairChoiceMap(List<Person> initialFloatingPeople, Map<Person, Space> availablePersonToSpaceMap, List<PairingHistory> workspacePairingHistories) {
            Map<Person, List<Pair<Person, Timestamp>>> floatingPersonListMap = new HashMap<>();

            for (Person floatingPerson : initialFloatingPeople) {
                List<Pair<Person, Timestamp>> floatingPersonList = new ArrayList<>();

                List<PairingHistory> floatingPersonPairingHistories = getPairingHistoryForPerson(floatingPerson, workspacePairingHistories);

                for (Person availablePerson : availablePersonToSpaceMap.keySet()) {

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

        //************************//
        //*** Public Functions ***//
        //************************//

        public boolean canAPairingBeMade() {
            /*
             * There is at least one Floating Person and someone to pair them with
             */
            return !currentFloatingPeople.isEmpty() && currentFloatingPeople.size() + currentUnpairedStickingPeople.size() > 1;
        }

        public boolean isCurrentPairingValid() {
            if(initialFloatingPeople.size() <= initialUnpairedStickingPeople.size()) {
                /*
                 * Each Floating Person Should Be Paired With an Unpaired Sticking Person
                 */
                return currentPairingMap.size() == initialFloatingPeople.size();
            }
            else {
                /*
                 * All Unpaired Sticking People should be paired
                 */
                return currentUnpairedStickingPeople.isEmpty();
            }
        }

        public void updateBestPairing() {
            if(currentPairingCost < bestPairingCostTotal) {
                bestPairingCostTotal = currentPairingCost;
                bestPairingMap = new HashMap<>(currentPairingMap);
            }
        }

        public Person getNextFloatingPerson() {
            /*
             * Pop off first person
             */
            return currentFloatingPeople.remove(0);
        }

        public void putFloatingPersonBack(Person currentFloatingPerson) {
            /*
             * Add person back to front of list
             */
            currentFloatingPeople.add(0, currentFloatingPerson);
        }

        public List<Pair<Person, Timestamp>> getPairingChoicesForFloatingPerson(Person currentFloatingPerson) {
            return floatingPeoplePairChoiceMap.get(currentFloatingPerson);
        }

        public boolean canPersonBePairedWith(Person currentPairingChoicePerson) {
            /*
             * Check to see if this person has not been paired with anyone else yet
             */
            return currentFloatingPeople.contains(currentPairingChoicePerson) || currentUnpairedStickingPeople.contains(currentPairingChoicePerson);
        }

        public void pairFloatingPersonWith(Person currentFloatingPerson, Pair<Person, Timestamp> currentPairingChoiceWithTime) {
            Person currentPairingChoicePerson = currentPairingChoiceWithTime.getKey();
            long currentPairingChoiceCost = currentPairingChoiceWithTime.getValue().getTime();

            currentPairingCost += currentPairingChoiceCost;
            currentPairingMap.put(currentFloatingPerson, currentPairingChoicePerson);

            if(currentFloatingPeople.contains(currentPairingChoicePerson)) {
                currentFloatingPeople.remove(currentPairingChoicePerson);
            }
            else {
                currentUnpairedStickingPeople.remove(currentPairingChoicePerson);
            }
        }

        public void unpairFloatingPersonWith(Person currentFloatingPerson, Pair<Person, Timestamp> currentPairingChoiceWithTime) {
            Person currentPairingChoicePerson = currentPairingChoiceWithTime.getKey();
            long currentPairingChoiceCost = currentPairingChoiceWithTime.getValue().getTime();

            currentPairingCost -= currentPairingChoiceCost;
            currentPairingMap.remove(currentFloatingPerson);

            if(initialFloatingPeople.contains(currentPairingChoicePerson)) {
                currentFloatingPeople.add(currentPairingChoicePerson);
            }
            else {
                currentUnpairedStickingPeople.add(currentPairingChoicePerson);
            }
        }

        public boolean canExcludeMySelf(Person currentFloatingPerson) {
            /*
             * No one has been excluded yet
             *   AND
             * there are more Floating People than Unpaired Sticking People
             *   AND
             * there are an odd amount of people to pair in total
             */
            return !hasSomeoneBeenExcluded
                    && initialFloatingPeople.size() > initialUnpairedStickingPeople.size()
                    && (initialFloatingPeople.size() + initialUnpairedStickingPeople.size()) % 2 == 1;
        }

        public void excludeFloatingPerson(Person currentFloatingPerson) {
            currentFloatingPeople.remove(currentFloatingPerson);
            hasSomeoneBeenExcluded = true;
        }

        public void includeFloatingPerson(Person currentFloatingPerson) {
            currentFloatingPeople.add(currentFloatingPerson);
            hasSomeoneBeenExcluded = false;
        }

        public Map<Person,Person> getBestPairingMap() {
            return bestPairingMap;
        }

        public Space getSpaceForAvailabelPerson(Person personToPairWith) {
            return availablePersonToSpaceMap.get(personToPairWith);
        }

        public boolean hasSoloPerson() {
            return !currentFloatingPeople.isEmpty();
        }

        public Person getSoloPerson() {
            return currentFloatingPeople.get(0);
        }

        public void removeFloatingPerson(Person floatingPerson) {
            currentFloatingPeople.remove(floatingPerson);
        }
    }
}
