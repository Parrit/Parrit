package com.parrit.repositories;

import com.parrit.entities.PairingHistory;
import com.parrit.entities.Project;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PairingHistoryRepository extends CrudRepository<PairingHistory, Long> {

    List<PairingHistory> findByProject(Project project);

    List<PairingHistory> findByProjectOrderByTimestampDesc(Project project);
}
