var { postNewWorkspaceAndDo, postLoginAndRedirect } = require('shared/helpers/databaseHelpers.js');

export function createWorkspaceThunk(name, password) {
    postNewWorkspaceAndDo(name, password, function() {
        postLoginAndRedirect(name, password);
    });
}

export function loginThunk(name, password) {
    postLoginAndRedirect(name, password);
}


