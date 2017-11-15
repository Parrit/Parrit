package com.parrit.configurations;

import com.parrit.DTOs.ProjectDTO;
import com.parrit.entities.Project;
import com.parrit.repositories.ProjectRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.User;
import org.springframework.stereotype.Service;

@Service
public class AuthorizationService {

    private ProjectRepository projectRepository;

    @Autowired
    public AuthorizationService(ProjectRepository projectRepository) {
        this.projectRepository = projectRepository;
    }

    public boolean canAccessProject(User user, String projectName) {
        return user != null && user.getUsername().equals(projectName);
    }

    public boolean canAccessProject(User user, Project project) {
        return canAccessProject(user, project.getName());
    }

    public boolean canAccessProject(User user, long projectId) {
        return canAccessProject(user, projectRepository.findOne(projectId));
    }

    public boolean canAccessProject(User user, ProjectDTO projectDTO) {
        return canAccessProject(user, projectDTO.getName());
    }
}
