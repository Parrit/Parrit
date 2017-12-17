import { putProjectAndDo, postAddNewPersonAndDo, postAddNewPairingBoardAndDo, putPairingBoardAndDo, postProjectPairingAndDo, getRecommendedPairingAndDo, getPairingHistoryAndDo, postLogout } from 'shared/helpers/DatabaseHelpers.js';
import { loadProjectCreator, loadPairingHistoryCreator, updatePairingHistoriesCreator } from 'project/actions/creators/DataCreators.js';
import { setNewPersonModalErrorMessageCreator, setNewPairingBoardModalErrorMessageCreator, setEditPairingBoardErrorMessageCreator, clearEditPairingBoardErrorMessageCreator } from 'project/actions/creators/SettingsCreators.js';

export function autoSaveThunk(action) {
    return function (dispatch, getState) {
        dispatch(action);
        putProjectAndDo(getState().data.project,
            function successCallback(project) {
                dispatch(loadProjectCreator(project));
            },
            function errorCallback(errorResponse) {
                //TODO: Reverse action? Display error message?
            }
        );
    }
}

export function addNewPersonThunk(projectId, name, callback) {
    return function(dispatch, getState) {
        postAddNewPersonAndDo(projectId, name,
            function successCallback(project) {
                callback();
                dispatch(loadProjectCreator(project));
            },
            function errorCallback(errorResponse) {
                dispatch(setNewPersonModalErrorMessageCreator(errorResponse))
            }
        )
    }
}

export function addNewPairingBoardThunk(projectId, name, callback) {
    return function(dispatch, getState) {
        postAddNewPairingBoardAndDo(projectId, name,
            function successCallback(project) {
                callback();
                dispatch(loadProjectCreator(project));
            },
            function errorCallback(errorResponse) {
                dispatch(setNewPairingBoardModalErrorMessageCreator(errorResponse))
            }
        )
    }
}

export function renamePairingBoardThunk(pairingBoardId, name, callback) {
    return function(dispatch, getState) {
        dispatch(clearEditPairingBoardErrorMessageCreator(pairingBoardId));
        putPairingBoardAndDo(getState().data.project.id, pairingBoardId, name,
            function successCallback(project) {
                callback();
                dispatch(loadProjectCreator(project));
            },
            function errorCallback(errorResponse) {
                dispatch(setEditPairingBoardErrorMessageCreator(pairingBoardId, errorResponse))
            }
        )
    }
}

export function savePairingThunk() {
    return function (dispatch, getState) {
        postProjectPairingAndDo(getState().data.project.id,
            function successCallback(newPairingHistories) {
                dispatch(updatePairingHistoriesCreator(newPairingHistories));
            });
    }
}

export function getRecommendedPairsThunk() {
    return function(dispatch, getState) {
        getRecommendedPairingAndDo(getState().data.project.id,
            function successCallback(project) {
                dispatch(loadProjectCreator(project));
            })
    }
}

export function getPairingHistoryThunk(projectId) {
    return function(dispatch, getState) {
        getPairingHistoryAndDo(projectId,
            function successCallback(pairingHistories) {
                dispatch(loadPairingHistoryCreator(pairingHistories));
            })
    }
}

export function postLogoutThunk() {
    return function(dispatch, getState) {
        postLogout();
    }
}
