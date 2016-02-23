var dashboardThunks = require('dashboard/actions/thunks/dashboardThunks.js');

function setNewWorkspaceModalOpen(isOpen) {
    return {
        type: 'SET_NEW_WORKSPACE_MODAL_OPEN',
        isOpen: isOpen
    }
}

module.exports = {
    setNewWorkspaceModalOpen: setNewWorkspaceModalOpen,
    createWorkspace: dashboardThunks.createWorkspaceThunk
};
