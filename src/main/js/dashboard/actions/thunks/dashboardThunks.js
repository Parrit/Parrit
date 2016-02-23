var databaseHelpers = require('shared/helpers/databaseHelpers.js');
var { updateWorkspaceNameList } = require('dashboard/actions/simpleActions.js');

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
