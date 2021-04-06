package com.parrit.repositories;

import com.parrit.entities.PairingHistory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PairingHistoryRepository extends JpaRepository<PairingHistory, Long>, CustomizedPairingHistoryRepository {

}
