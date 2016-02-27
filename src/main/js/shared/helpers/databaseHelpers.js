var Axios = require('axios');

Axios.defaults.headers.post['Content-Type'] = 'application/json';

function postWorkspaceAndDo(workspace, callback) {
    Axios.post('/api/workspace', workspace)
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

function postWorkspacePairingAndDo(workspaceId, callback) {
    Axios.post('/api/workspace/' + encodeURIComponent(workspaceId) + '/pairing')
        .then(function (response) {
            callback(response.data);
        })
}

function getRecommendedPairingAndDo(workspaceId, callback) {
    Axios.get('/api/workspace/' + encodeURIComponent(workspaceId) + '/pairing/recommend')
        .then(function (response) {
            callback(response.data);
        });
}

module.exports = {
    postWorkspaceAndDo,
    postNewWorkspaceAndDo,
    postWorkspacePairingAndDo,
    getRecommendedPairingAndDo
};
