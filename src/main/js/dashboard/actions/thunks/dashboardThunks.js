var databaseHelpers = require('shared/helpers/databaseHelpers.js');

function createWorkspaceThunk(workspaceName) {
    return function (dispatch) {
        databaseHelpers.postNewWorkspaceAndDo(workspaceName, function(workspace) {
            dispatch(updateWorkspaceNameList(workspace));
        });
    }
}

module.exports = {
    createWorkspaceThunk: createWorkspaceThunk
};

// Helper Functions
function updateWorkspaceNameList(workspaceNames) {
    return {
        type: 'UPDATE_WORKSPACE_NAME_LIST',
        workspaceNames: workspaceNames
    };
}