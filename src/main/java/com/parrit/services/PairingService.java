package com.parrit.services;

import com.parrit.entities.PairingHistory;
import com.parrit.entities.Person;
import com.parrit.entities.Space;
import com.parrit.entities.Workspace;
import com.parrit.repositories.PairingHistoryRepository;
import com.parrit.repositories.WorkspaceRepository;
import com.parrit.utilities.CurrentTimeProvider;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PairingService {

    PairingHistoryRepository pairingHistoryRepository;
    WorkspaceRepository workspaceRepository;
    RecommendationService recommendationService;
    CurrentTimeProvider currentTimeProvider;

    @Autowired
    public PairingService(PairingHistoryRepository pairingHistoryRepository,
                          WorkspaceRepository workspaceRepository,
                          RecommendationService recommendationService,
                          CurrentTimeProvider currentTimeProvider) {
        this.pairingHistoryRepository = pairingHistoryRepository;
        this.workspaceRepository = workspaceRepository;
        this.recommendationService = recommendationService;
        this.currentTimeProvider = currentTimeProvider;
    }

    public void savePairing(long workspaceId) {
        Workspace workspace = workspaceRepository.findOne(workspaceId);

        Long groupId = 1L;
        for(Space space : workspace.getSpaces()) {
            List<Person> people = space.getPeople();

            for(int i = 0; i<people.size(); i++) {
                Person currentPerson = people.get(i);

                for(int j=i+1; j<people.size(); j++) {
                    PairingHistory pairingHistory = new PairingHistory(workspace, currentPerson, people.get(j), currentTimeProvider.getCurrentTime(), groupId);
                    pairingHistoryRepository.save(pairingHistory);
                }

            }

            groupId++;
        }

    }

    public Workspace getRecommendation(long workspaceId) {
        Workspace workspace = workspaceRepository.findOne(workspaceId);
        List<PairingHistory> pairingHistory = pairingHistoryRepository.findByWorkspace(workspace);

        Workspace recommendedWorkspace = recommendationService.get(workspace, pairingHistory);

        workspaceRepository.save(recommendedWorkspace);
        return recommendedWorkspace;
    }
}
