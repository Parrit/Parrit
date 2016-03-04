var { postNewWorkspaceAndDo } = require('shared/helpers/databaseHelpers.js');
var { updateWorkspaceNameListCreator } = require('dashboard/actions/creators/dashboardCreators.js');

export function createWorkspaceThunk(name, password) {
    return function (dispatch) {
        postNewWorkspaceAndDo(name, password, function(workspace) {
            dispatch(updateWorkspaceNameListCreator(workspace));
        });
    }
}
