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

}
