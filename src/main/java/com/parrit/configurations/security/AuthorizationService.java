package com.parrit.configurations.security;

import com.parrit.DTOs.WorkspaceDTO;
import com.parrit.entities.Workspace;
import com.parrit.repositories.WorkspaceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.User;
import org.springframework.stereotype.Service;

@Service
public class AuthorizationService {

    @Autowired
    WorkspaceRepository workspaceRepository;

    public boolean canAccessWorkspace(User user, String workspaceName) {
        return user != null && user.getUsername().equals(workspaceName);
    }

    public boolean canAccessWorkspace(User user, Workspace workspace) {
        return canAccessWorkspace(user, workspace.getName());
    }

    public boolean canAccessWorkspace(User user, long workspaceId) {
        return canAccessWorkspace(user, workspaceRepository.findOne(workspaceId));
    }

    public boolean canAccessWorkspace(User user, WorkspaceDTO workspaceDTO) {
        return canAccessWorkspace(user, workspaceDTO.getName());
    }
}
