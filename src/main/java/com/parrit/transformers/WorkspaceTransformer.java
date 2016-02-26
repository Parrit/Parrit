package com.parrit.transformers;

import com.parrit.DTOs.WorkspaceDTO;
import com.parrit.entities.Workspace;

public class WorkspaceTransformer {

    public static WorkspaceDTO transform(Workspace workspace) {
        WorkspaceDTO workspaceDTO = new WorkspaceDTO();
        workspaceDTO.setId(workspace.getId());
        workspaceDTO.setName(workspace.getName());
        workspaceDTO.setPeople(PersonTransformer.transform(workspace.getPeople()));
        workspaceDTO.setSpaces(SpaceTransformer.transform(workspace.getSpaces()));
        return workspaceDTO;
    }

}
