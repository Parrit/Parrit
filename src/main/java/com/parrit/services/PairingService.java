package com.parrit.services;

import com.parrit.entities.PairingHistory;
import com.parrit.entities.Project;
import com.parrit.repositories.PairingHistoryRepository;
import com.parrit.utilities.CurrentTimeProvider;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class PairingService {

    private final PairingHistoryRepository pairingHistoryRepository;
    private final RecommendationService recommendationService;
    private final CurrentTimeProvider currentTimeProvider;

    @Autowired
    PairingService(PairingHistoryRepository pairingHistoryRepository,
                   RecommendationService recommendationService,
                   CurrentTimeProvider currentTimeProvider) {
        this.pairingHistoryRepository = pairingHistoryRepository;
        this.recommendationService = recommendationService;
        this.currentTimeProvider = currentTimeProvider;
    }

    public List<PairingHistory> savePairing(Project project) {
        Timestamp currentTime = currentTimeProvider.getCurrentTime();

        return project.getPairingBoards().stream()
                .filter(pb -> !pb.getPeople().isEmpty())
                .map(pb -> new PairingHistory(project, pb.getName(), new ArrayList<>(pb.getPeople()), currentTime))
                .map(pairingHistoryRepository::save)
                .collect(Collectors.toList());
    }

    public Project getRecommendation(Project project) {
        List<PairingHistory> pairingHistory = pairingHistoryRepository.findByProject(project);
        return recommendationService.get(project, pairingHistory);
    }

    public List<PairingHistory> getSortedPairingHistory(Project project) {
        return pairingHistoryRepository.findByProjectOrderByTimestampDesc(project);
    }
}
