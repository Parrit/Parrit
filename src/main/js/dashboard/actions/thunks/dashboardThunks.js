var databaseHelpers = require('shared/helpers/databaseHelpers.js');
var { updateWorkspaceNameListCreator } = require('dashboard/actions/creators/dashboardCreators.js');

export function createWorkspaceThunk(workspaceName) {
    return function (dispatch) {
        databaseHelpers.postNewWorkspaceAndDo(workspaceName, function(workspace) {
            dispatch(updateWorkspaceNameListCreator(workspace));
        });
    }
}
