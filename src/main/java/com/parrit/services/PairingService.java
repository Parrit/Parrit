package com.parrit.services;

import com.parrit.entities.PairingArrangement;
import com.parrit.entities.PairingHistory;
import com.parrit.entities.Project;
import com.parrit.repositories.PairingHistoryRepository;
import com.parrit.utilities.CurrentTimeProvider;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;

@Service
public class PairingService {

    private static final long ONE_MONTH_IN_MILLISECONDS = 30 * 24 * 60 * 60 * 1000L;

    private final PairingHistoryRepository pairingHistoryRepository;
    private final CurrentTimeProvider currentTimeProvider;

    @Autowired
    PairingService(
            PairingHistoryRepository pairingHistoryRepository,
            CurrentTimeProvider currentTimeProvider
    ) {
        this.pairingHistoryRepository = pairingHistoryRepository;
        this.currentTimeProvider = currentTimeProvider;
    }

    public void savePairing(Project project) {
        Timestamp currentTime = currentTimeProvider.getCurrentTime();

        project.getPairingBoards().stream()
                .filter(board -> !board.getPeople().isEmpty())
                .map(board -> new PairingHistory(project, board.getName(), new ArrayList<>(board.getPeople()), currentTime))
                .forEach(pairingHistoryRepository::save);
    }

    public List<PairingArrangement> getSortedPairingHistory(Project project) {
        Timestamp currentTime = currentTimeProvider.getCurrentTime();
        Timestamp thirtyDaysAgo = new Timestamp(currentTime.getTime() - ONE_MONTH_IN_MILLISECONDS);
        return pairingHistoryRepository.findByProjectAndTimestampAfterOrderByTimestampDesc(project, thirtyDaysAgo);
    }
}
