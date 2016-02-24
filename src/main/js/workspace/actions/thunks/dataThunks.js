var databaseHelpers = require('shared/helpers/databaseHelpers.js');

export function autoSaveThunk(action) {
    return function (dispatch, getState) {
        dispatch(action);
        databaseHelpers.postStateAndDo(getState(), function(workspace) {
            dispatch(loadWorkspaceCreator(workspace));
        });
    }
}

// Helper Functions
function loadWorkspaceCreator(workspace) {
    return {
        type: 'LOAD_WORKSPACE',
        workspace: workspace
    };
}