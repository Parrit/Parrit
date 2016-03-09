package com.parrit.configurations.security;

import com.parrit.entities.Workspace;
import com.parrit.repositories.WorkspaceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Service;

import java.util.Collections;

@Service
public class WorkspaceDetailsService implements UserDetailsService {

    private WorkspaceRepository workspaceRepository;

    @Autowired
    public WorkspaceDetailsService(WorkspaceRepository workspaceRepository) {
        this.workspaceRepository = workspaceRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String name) {
        Workspace workspace = workspaceRepository.findByName(name);

        if(workspace == null)
            return null;

        return new User(workspace.getName(), workspace.getPassword(), Collections.emptyList());
    }
}
