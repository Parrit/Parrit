var { postWorkspaceAndDo } = require('shared/helpers/databaseHelpers.js');
var { loadWorkspaceCreator } = require('workspace/actions/creators/dataCreators.js');

export function autoSaveThunk(action) {
    return function (dispatch, getState) {
        dispatch(action);
        postWorkspaceAndDo(getState().data.workspace, function(workspace) {
            dispatch(loadWorkspaceCreator(workspace));
        });
    }
}
