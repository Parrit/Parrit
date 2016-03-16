package com.parrit.transformers;

import com.parrit.DTOs.ProjectDTO;
import com.parrit.entities.Project;

public class ProjectTransformer {

    public static ProjectDTO transform(Project project) {
        ProjectDTO projectDTO = new ProjectDTO();
        projectDTO.setId(project.getId());
        projectDTO.setName(project.getName());
        projectDTO.setPeople(PersonTransformer.transform(project.getPeople()));
        projectDTO.setPairingBoards(PairingBoardTransformer.transform(project.getPairingBoards()));
        return projectDTO;
    }

    public static Project merge(Project project, ProjectDTO projectDTO) {
        Project mergedProject = new Project();
        mergedProject.setId(project.getId());
        mergedProject.setName(projectDTO.getName());
        mergedProject.setPassword(project.getPassword());
        mergedProject.setPeople(PersonTransformer.reverse(projectDTO.getPeople()));
        mergedProject.setPairingBoards(PairingBoardTransformer.reverse(projectDTO.getPairingBoards()));
        return mergedProject;
    }
}
