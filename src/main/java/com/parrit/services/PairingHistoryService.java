package com.parrit.services;

import com.parrit.entities.PairingHistory;
import com.parrit.entities.Person;
import com.parrit.entities.Space;
import com.parrit.repositories.PairingHistoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Collection;
import java.util.List;

@Service
public class PairingHistoryService {

    PairingHistoryRepository pairingHistoryRepository;

    @Autowired
    public PairingHistoryService(PairingHistoryRepository pairingHistoryRepository) {
        this.pairingHistoryRepository = pairingHistoryRepository;
    }

    public void savePairing(Collection<Space> spaces) {

        int groupId = 1;
        for(Space space : spaces) {
            List<Person> people = space.getPeople();

            for(int i = 0; i<people.size(); i++) {
                Person currentPerson = people.get(i);

                for(int j=i+1; j<people.size(); j++) {
                    PairingHistory pairingHistory = new PairingHistory();
                    pairingHistory.setPersonOne(currentPerson);
                    pairingHistory.setPersonTwo(people.get(j));
                    pairingHistory.setGroupId(groupId);
                    pairingHistory.setTimestamp(null);
                    pairingHistoryRepository.save(pairingHistory);
                }

            }

            groupId++;
        }

    }

}
