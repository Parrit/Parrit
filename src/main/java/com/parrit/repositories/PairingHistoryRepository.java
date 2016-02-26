package com.parrit.repositories;

import com.parrit.entities.PairingHistory;
import com.parrit.entities.Workspace;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PairingHistoryRepository extends CrudRepository<PairingHistory, Long> {

    List<PairingHistory> findByWorkspace(Workspace workspace);
}
