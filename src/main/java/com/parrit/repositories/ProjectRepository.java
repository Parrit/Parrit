package com.parrit.repositories;

import com.parrit.entities.Project;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProjectRepository extends CrudRepository<Project, Long> {
    String TABLE_NAME = "project";
    String PASSWORD_COLUMN_NAME = "password";

    Project findByName(String name);
}
