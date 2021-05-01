package com.parrit.repositories;

import com.parrit.entities.PairingArrangement;
import com.parrit.entities.Project;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.sql.Timestamp;
import java.util.List;

@Repository
public interface PairingArrangementRepository extends JpaRepository<PairingArrangement, Long>, CustomizedPairingHistoryRepository {
    List<PairingArrangement> findByProjectAndPairingTimeAfterOrderByPairingTimeDesc(Project project, Timestamp timestamp);

}
