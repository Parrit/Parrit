package com.parrit.repositories;

import com.parrit.entities.PairingHistory;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PairingHistoryRepository extends CrudRepository<PairingHistory, Long> {

}
