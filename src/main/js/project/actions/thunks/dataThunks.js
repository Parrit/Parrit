import {
    postProjectAndDo,
    postProjectPairingAndDo,
    getRecommendedPairingAndDo,
    postAddNewPersonAndDo,
    getPairingHistoryAndDo,
    postLogout
} from 'shared/helpers/databaseHelpers.js';

import { loadProjectCreator, loadPairingHistoryCreator, updatePairingHistoriesCreator } from 'project/actions/creators/dataCreators.js';
import { setErrorTypeCreator } from 'project/actions/creators/viewCreators.js';

export function autoSaveThunk(action) {
    return function (dispatch, getState) {
        dispatch(action);
        postProjectAndDo(getState().data.project,
            function successCallback(project) {
                dispatch(loadProjectCreator(project));
            },
            function errorCallback(errorStatus) {
                dispatch(setErrorTypeCreator(errorStatus));
            }
        );
    }
}

export function savePairingThunk() {
    return function (dispatch, getState) {
        postProjectPairingAndDo(getState().data.project.id, function successCallback(newPairingHistories) {
            dispatch(updatePairingHistoriesCreator(newPairingHistories));
        });
    }
}

export function getRecommendedPairsThunk() {
    return function(dispatch, getState) {
        getRecommendedPairingAndDo(getState().data.project.id, function successCallback(project) {
            dispatch(loadProjectCreator(project));
        })
    }
}

export function addNewPersonThunk(projectId, name, callback) {
    return function(dispatch, getState) {
        postAddNewPersonAndDo(projectId, name,
            function successCallback(project) {
                callback();
                dispatch(loadProjectCreator(project));
            },
            function errorCallback(errorStatus) {
                dispatch(setErrorTypeCreator(errorStatus));
            }
        )
    }
}

export function getPairingHistoryThunk(projectId) {
    return function(dispatch, getState) {
        getPairingHistoryAndDo(projectId, function(pairingHistories) {
            dispatch(loadPairingHistoryCreator(pairingHistories));
        })
    }
}

export function postLogoutThunk() {
    return function(dispatch, getState) {
        postLogout();
    }
}
