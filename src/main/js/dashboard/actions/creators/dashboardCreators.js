export function setNewWorkspaceModalOpen(isOpen) {
    return {
        type: 'SET_NEW_WORKSPACE_MODAL_OPEN',
        isOpen: isOpen
    }
}

export function updateWorkspaceNameList(workspaceNames) {
    return {
        type: 'UPDATE_WORKSPACE_NAME_LIST',
        workspaceNames: workspaceNames
    };
}