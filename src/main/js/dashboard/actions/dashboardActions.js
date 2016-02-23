var dashboardThunks = require('dashboard/actions/thunks/dashboardThunks.js');
var { setNewWorkspaceModalOpen, updateWorkspaceNameList } = require('dashboard/actions/simpleActions.js');

module.exports = {
    setNewWorkspaceModalOpen,
    updateWorkspaceNameList,
    createWorkspace: dashboardThunks.createWorkspaceThunk
};
