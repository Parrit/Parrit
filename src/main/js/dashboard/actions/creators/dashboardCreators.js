export function setNewWorkspaceModalOpenCreator(isOpen) {
    return {
        type: 'SET_NEW_WORKSPACE_MODAL_OPEN',
        isOpen: isOpen
    }
}

export function updateWorkspaceNameListCreator(workspaceNames) {
    return {
        type: 'UPDATE_WORKSPACE_NAME_LIST',
        workspaceNames: workspaceNames
    };
}