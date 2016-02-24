var dashboardCreators = require('dashboard/actions/creators/dashboardCreators.js');
var dashboardThunks = require('dashboard/actions/thunks/dashboardThunks.js');

module.exports = {
    createWorkspace: dashboardThunks.createWorkspaceThunk,
    setNewWorkspaceModalOpen: dashboardCreators.setNewWorkspaceModalOpenCreator
};
