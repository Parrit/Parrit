package com.parrit.repositories;

import com.parrit.entities.PairingHistory;
import com.parrit.entities.Project;

import java.sql.Timestamp;
import java.util.List;

public interface CustomizedPairingHistoryRepository {
    List<PairingHistory> findByProjectAndTimestampAfterOrderByTimestampDesc(Project project, Timestamp timestamp);

}
