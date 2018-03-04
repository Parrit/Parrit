package com.parrit.services;

import com.parrit.entities.PairingBoard;
import com.parrit.entities.PairingHistory;
import com.parrit.entities.Person;
import com.parrit.entities.Project;
import com.parrit.repositories.PairingHistoryRepository;
import com.parrit.repositories.ProjectRepository;
import com.parrit.utilities.CurrentTimeProvider;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;

@Service
public class PairingService {

    private PairingHistoryRepository pairingHistoryRepository;
    private ProjectRepository projectRepository;
    private RecommendationService recommendationService;
    private CurrentTimeProvider currentTimeProvider;

    @Autowired
    PairingService(PairingHistoryRepository pairingHistoryRepository,
                   ProjectRepository projectRepository,
                   RecommendationService recommendationService,
                   CurrentTimeProvider currentTimeProvider) {
        this.pairingHistoryRepository = pairingHistoryRepository;
        this.projectRepository = projectRepository;
        this.recommendationService = recommendationService;
        this.currentTimeProvider = currentTimeProvider;
    }

    public List<PairingHistory> savePairing(long projectId) {
        List<PairingHistory> pairingHistories = new ArrayList<>();

        Project project = projectRepository.findById(projectId).orElse(Project.NULL);
        Timestamp currentTime = currentTimeProvider.getCurrentTime();

        for(PairingBoard pairingBoard : project.getPairingBoards()) {
            List<Person> pairingBoardPeople = pairingBoard.getPeople();

            if(!pairingBoardPeople.isEmpty()) {
                PairingHistory pairingHistory = new PairingHistory(project, pairingBoard.getName(), new ArrayList<>(pairingBoardPeople), currentTime);
                PairingHistory savedPairingHistory = pairingHistoryRepository.save(pairingHistory);
                pairingHistories.add(savedPairingHistory);
            }
        }

        return pairingHistories;
    }

    public Project getRecommendation(long projectId) {
        Project project = projectRepository.findById(projectId).orElse(Project.NULL);
        List<PairingHistory> pairingHistory = pairingHistoryRepository.findByProject(project);

        Project recommendedProject = recommendationService.get(project, pairingHistory);

        projectRepository.save(recommendedProject);
        return recommendedProject;
    }

    public List<PairingHistory> getSortedPairingHistory(long projectId) {
        Project project = projectRepository.findById(projectId).orElse(Project.NULL);
        return pairingHistoryRepository.findByProjectOrderByTimestampDesc(project);
    }
}
