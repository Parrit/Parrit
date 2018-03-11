package com.parrit.repositories;

import com.parrit.entities.PairingBoard;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PairingBoardRepository extends JpaRepository<PairingBoard, Long> {

}