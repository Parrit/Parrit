const { setNewProjectErrorCreator, setLoginErrorCreator } = require('dashboard/actions/creators/dashboardCreators.js');
const { postNewProjectAndDo, postLoginAndRedirect } = require('shared/helpers/databaseHelpers.js');

export function createProjectThunk(name, password) {
    return function(dispatch, getState) {
        postNewProjectAndDo(name, password,
            function successCallback() {
                postLoginAndRedirect(name, password);
            },
            function errorCallback(errorStatus) {
                dispatch(setNewProjectErrorCreator(errorStatus));
            }
        );
    }
}

export function loginThunk(name, password) {
    return function(dispatch, getState) {
        postLoginAndRedirect(name, password,
            function errorCallback(errorStatus) {
                dispatch(setLoginErrorCreator(errorStatus));
            }
        );
    }
}


