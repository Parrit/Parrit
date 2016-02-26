package com.parrit.services;

import com.parrit.entities.PairingHistory;
import com.parrit.entities.Person;
import com.parrit.entities.Space;
import com.parrit.entities.Workspace;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RecommendationService {
    public Workspace get(Workspace workspace, List<PairingHistory> pairingHistories) {
        List<Person> floatingPeople = workspace.getPeople();

        while(!floatingPeople.isEmpty()) {
            Person floatingPerson = floatingPeople.remove(0);

            List<Space> spaces = workspace.getSpaces();
            Space firstSpace = spaces.get(0);

            List<Person> firstSpacePeople = firstSpace.getPeople();
            firstSpacePeople.add(floatingPerson);
        }

        return workspace;
    }
}
