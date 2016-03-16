var { postProjectAndDo, postProjectPairingAndDo, getRecommendedPairingAndDo } = require('shared/helpers/databaseHelpers.js');
var { loadProjectCreator } = require('project/actions/creators/dataCreators.js');

export function autoSaveThunk(action) {
    return function (dispatch, getState) {
        dispatch(action);
        postProjectAndDo(getState().data.project, function(project) {
            dispatch(loadProjectCreator(project));
        });
    }
}

export function savePairingThunk() {
    return function (dispatch, getState) {
        postProjectPairingAndDo(getState().data.project.id, function() {
            alert("Successfully Saved Pairing!");
        });
    }
}

export function getRecommendedPairsThunk() {
    return function(dispatch, getState) {
        getRecommendedPairingAndDo(getState().data.project.id, function(project) {
            dispatch(loadProjectCreator(project));
        })
    }
}
