package com.parrit.services;

import com.parrit.entities.PairingArrangement;
import com.parrit.entities.PairingHistory;
import com.parrit.entities.Project;
import com.parrit.repositories.PairingArrangementRepository;
import com.parrit.utilities.CurrentTimeProvider;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;

import static java.util.stream.Collectors.toSet;

@Service
public class PairingService {

    private static final long ONE_MONTH_IN_MILLISECONDS = 30 * 24 * 60 * 60 * 1000L;

    private final PairingArrangementRepository pairingArrangementRepository;
    private final CurrentTimeProvider currentTimeProvider;

    @Autowired
    PairingService(
            PairingArrangementRepository pairingArrangementRepository,
            CurrentTimeProvider currentTimeProvider
    ) {
        this.pairingArrangementRepository = pairingArrangementRepository;
        this.currentTimeProvider = currentTimeProvider;
    }

    public void savePairing(Project project) {
        Timestamp currentTime = currentTimeProvider.getCurrentTime();

        Set<PairingHistory> pairingHistories = project.getPairingBoards().stream()
                .filter(board -> !board.getPeople().isEmpty())
                .map(board -> new PairingHistory(null, board.getName(), new ArrayList<>(board.getPeople()), null))
                .collect(toSet());

        if (pairingHistories.isEmpty()) {
            return;
        }

        PairingArrangement pairingArrangement = PairingArrangement.builder()
                .pairingTime(currentTime)
                .project(project)
                .pairingHistories(pairingHistories)
                .build();

        pairingArrangementRepository.save(pairingArrangement);
    }

    public List<PairingArrangement> getSortedPairingHistory(Project project) {
        Timestamp currentTime = currentTimeProvider.getCurrentTime();
        Timestamp thirtyDaysAgo = new Timestamp(currentTime.getTime() - ONE_MONTH_IN_MILLISECONDS);
        return pairingArrangementRepository.findByProjectAndPairingTimeAfterOrderByPairingTimeDesc(project, thirtyDaysAgo);
    }
}
