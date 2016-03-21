package com.parrit.services;

import com.parrit.entities.PairingHistory;
import com.parrit.entities.Person;
import com.parrit.entities.Project;
import com.parrit.entities.PairingBoard;
import com.parrit.repositories.PairingHistoryRepository;
import com.parrit.repositories.ProjectRepository;
import com.parrit.utilities.CurrentTimeProvider;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.util.List;

@Service
public class PairingService {

    PairingHistoryRepository pairingHistoryRepository;
    ProjectRepository projectRepository;
    RecommendationService recommendationService;
    CurrentTimeProvider currentTimeProvider;

    @Autowired
    public PairingService(PairingHistoryRepository pairingHistoryRepository,
                          ProjectRepository projectRepository,
                          RecommendationService recommendationService,
                          CurrentTimeProvider currentTimeProvider) {
        this.pairingHistoryRepository = pairingHistoryRepository;
        this.projectRepository = projectRepository;
        this.recommendationService = recommendationService;
        this.currentTimeProvider = currentTimeProvider;
    }

    public void savePairing(long projectId) {
        Project project = projectRepository.findOne(projectId);
        Timestamp currentTime = currentTimeProvider.getCurrentTime();

        for(PairingBoard pairingBoard : project.getPairingBoards()) {
            List<Person> people = pairingBoard.getPeople();

            if(people.size() == 1) {
                PairingHistory pairingHistory = new PairingHistory(project, people.get(0),
                    null, currentTime, pairingBoard.getName());
                pairingHistoryRepository.save(pairingHistory);
                continue;
            }

            for(int i = 0; i<people.size(); i++) {
                Person currentPerson = people.get(i);

                for(int j=i+1; j<people.size(); j++) {
                    PairingHistory pairingHistory = new PairingHistory(project, currentPerson,
                        people.get(j), currentTime, pairingBoard.getName());
                    pairingHistoryRepository.save(pairingHistory);
                }

            }
        }

    }

    public Project getRecommendation(long projectId) {
        Project project = projectRepository.findOne(projectId);
        List<PairingHistory> pairingHistory = pairingHistoryRepository.findByProject(project);

        Project recommendedProject = recommendationService.get(project, pairingHistory);

        projectRepository.save(recommendedProject);
        return recommendedProject;
    }
}
