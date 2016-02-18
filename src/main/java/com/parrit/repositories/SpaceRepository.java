package com.parrit.repositories;

import com.parrit.entities.Space;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SpaceRepository extends CrudRepository<Space, Long> {

}