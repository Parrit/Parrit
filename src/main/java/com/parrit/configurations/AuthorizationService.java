package com.parrit.configurations;

import com.parrit.entities.Project;
import com.parrit.repositories.ProjectRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.User;
import org.springframework.stereotype.Service;

import java.util.Objects;
import java.util.Optional;

@Service
public class AuthorizationService {

    private ProjectRepository projectRepository;

    @Autowired
    public AuthorizationService(ProjectRepository projectRepository) {
        this.projectRepository = projectRepository;
    }

    public boolean canAccessProject(User user, String projectName) {
        return user != null && Objects.equals(user.getUsername(), projectName);
    }

    public boolean canAccessProject(User user, long projectId) {
        Optional<Project> project = projectRepository.findById(projectId);
        return project
           .filter(p -> canAccessProject(user, p.getName()))
			  .isPresent();
    }
}
