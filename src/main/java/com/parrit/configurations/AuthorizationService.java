package com.parrit.configurations;

import com.parrit.entities.Project;
import com.parrit.repositories.ProjectRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.User;
import org.springframework.stereotype.Service;

import java.util.Objects;

@Service
public class AuthorizationService {

    private final ProjectRepository projectRepository;

    @Autowired
    public AuthorizationService(ProjectRepository projectRepository) {
        this.projectRepository = projectRepository;
    }

    public boolean canAccessProject(User user, String projectName) {
        return user != null && Objects.equals(user.getUsername(), projectName);
    }

    public boolean canAccessProject(User user, long projectId) {
        Project project = projectRepository.findOne(projectId);
        return project != null && canAccessProject(user, project.getName());
    }
}
