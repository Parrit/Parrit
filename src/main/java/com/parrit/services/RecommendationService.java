package com.parrit.services;

import com.parrit.entities.PairingHistory;
import com.parrit.entities.Person;
import com.parrit.entities.Space;
import com.parrit.entities.Workspace;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RecommendationService {

    private static final int FULL_SPACE_SIZE = 2;

    public Workspace get(Workspace workspace, List<PairingHistory> pairingHistories) {
        List<Person> floatingPeople = workspace.getPeople();

        while(!floatingPeople.isEmpty()) {
            Person floatingPerson = floatingPeople.remove(0);

            List<Space> spaces = workspace.getSpaces();
            Space spaceToInsert = getSpaceWithRoom(spaces);

            List<Person> firstSpacePeople = spaceToInsert.getPeople();
            firstSpacePeople.add(floatingPerson);
        }

        return workspace;
    }

    private Space getSpaceWithRoom(List<Space> spaces) {
        for(Space space : spaces) {
            if(space.getPeople().size() < FULL_SPACE_SIZE) {
                return space;
            }
        }
        return spaces.get(0);
    }
}
