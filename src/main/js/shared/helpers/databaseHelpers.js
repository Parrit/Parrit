var Axios = require('axios');

Axios.defaults.headers.post['Content-Type'] = 'application/json';

function postWorkspaceAndDo(workspace, callback) {
    Axios.post('/api/workspace', workspace)
        .then(function (response) {
            callback(response.data);
        });
}

function postNewWorkspaceAndDo(name, password, callback) {
    Axios.post('/api/workspace/new', {name, password})
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

function postLoginAndRedirect(name, password) {
    Axios.post('/login', {name: name, password: password})
        .then(function(response) {
            window.location.href = response.data;
        });
}

module.exports = {
    postWorkspaceAndDo,
    postNewWorkspaceAndDo,
    postWorkspacePairingAndDo,
    getRecommendedPairingAndDo,
    postLoginAndRedirect
};
