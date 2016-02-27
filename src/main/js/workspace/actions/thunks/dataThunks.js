var { postWorkspaceAndDo, postWorkspacePairingAndDo, getRecommendedPairingAndDo } = require('shared/helpers/databaseHelpers.js');
var { loadWorkspaceCreator } = require('workspace/actions/creators/dataCreators.js');

export function autoSaveThunk(action) {
    return function (dispatch, getState) {
        dispatch(action);
        postWorkspaceAndDo(getState().data.workspace, function(workspace) {
            dispatch(loadWorkspaceCreator(workspace));
        });
    }
}

export function savePairingThunk() {
    return function (dispatch, getState) {
        postWorkspacePairingAndDo(getState().data.workspace.id, function() {
            alert("Successfully Saved Pairing!");
        });
    }
}

export function getRecommendedPairsThunk() {
    return function(dispatch, getState) {
        getRecommendedPairingAndDo(getState().data.workspace.id, function(workspace) {
            dispatch(loadWorkspaceCreator(workspace));
        })
    }
}
