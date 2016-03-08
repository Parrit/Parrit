package com.parrit.repositories;

import com.parrit.entities.Workspace;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface WorkspaceRepository extends CrudRepository<Workspace, Long> {

    Workspace findByName(String name);
}
