var dashboardThunks = require('dashboard/actions/thunks/dashboardThunks.js');

module.exports = {
    login: dashboardThunks.loginThunk,
    createWorkspace: dashboardThunks.createWorkspaceThunk
};
