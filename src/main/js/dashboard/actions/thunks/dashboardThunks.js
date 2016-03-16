var { setLoginErrorCreator } = require('dashboard/actions/creators/dashboardCreators.js');
var { postNewProjectAndDo, postLoginAndRedirect } = require('shared/helpers/databaseHelpers.js');

export function createProjectThunk(name, password) {
    postNewProjectAndDo(name, password, function successCallback() {
        postLoginAndRedirect(name, password);
    });
}

export function loginThunk(name, password) {
    return function(dispatch, getState) {
        postLoginAndRedirect(name, password, function errorCallback(errorStatus) {
            dispatch(setLoginErrorCreator(errorStatus));
        });
    }
}


