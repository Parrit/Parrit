var Axios = require('axios');

Axios.defaults.headers.post['Content-Type'] = 'application/json';

function postStateAndDo(state, callback) {
    Axios.post('/api/workspace', state.data.workspace)
        .then(function (response) {
            callback(response.data);
        });
}

function postNewWorkspaceAndDo(workspaceName, callback) {
    Axios.post('/api/workspace/new', workspaceName)
        .then(function (response) {
            callback(response.data);
        })
}

module.exports = {
    postStateAndDo: postStateAndDo,
    postNewWorkspaceAndDo: postNewWorkspaceAndDo
};
