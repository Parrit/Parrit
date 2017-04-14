const dashboardThunks = require('dashboard/actions/thunks/dashboardThunks.js');

module.exports = {
    login: dashboardThunks.loginThunk,
    createProject: dashboardThunks.createProjectThunk
};
