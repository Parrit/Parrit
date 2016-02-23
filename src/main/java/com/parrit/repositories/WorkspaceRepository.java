package com.parrit.repositories;

import com.parrit.entities.Workspace;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface WorkspaceRepository extends CrudRepository<Workspace, Long> {

    Workspace findByName(String name);

    @Query("SELECT name FROM Workspace")
    List<String> getAllWorkspaceNames();

}
