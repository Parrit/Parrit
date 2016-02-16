var databaseHelpers = require('actions/helpers/databaseHelpers.js');

function autoSaveThunk(action) {
    return function (dispatch, getState) {
        dispatch(action);
        databaseHelpers.postStateAndDo(getState(), function(workspace) {
            dispatch(loadWorkspaceCreator(workspace));
        });
    }
}

function loadWorkspaceThunk() {
    return function(dispatch) {
        databaseHelpers.getStateAndDo(function(workspace) {
            if(workspace) dispatch(loadWorkspaceCreator(workspace));
        });
    };
}

module.exports = {
    autoSaveThunk: autoSaveThunk,
    loadWorkspaceThunk: loadWorkspaceThunk
};

// Helper Functions
function loadWorkspaceCreator(workspace) {
    return {
        type: 'LOAD_WORKSPACE',
        workspace: workspace
    };
}