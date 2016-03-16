var Axios = require('axios');

Axios.defaults.headers.post['Content-Type'] = 'application/json';

function postProjectAndDo(project, callback) {
    Axios.post('/api/project', project)
        .then(function (response) {
            callback(response.data);
        });
}

function postNewProjectAndDo(name, password, callback) {
    Axios.post('/api/project/new', {name, password})
        .then(function (response) {
            callback(response.data);
        })
}

function postProjectPairingAndDo(projectId, callback) {
    Axios.post('/api/project/' + encodeURIComponent(projectId) + '/pairing')
        .then(function (response) {
            callback(response.data);
        })
}

function getRecommendedPairingAndDo(projectId, callback) {
    Axios.get('/api/project/' + encodeURIComponent(projectId) + '/pairing/recommend')
        .then(function (response) {
            callback(response.data);
        });
}

function postLoginAndRedirect(name, password, errorCallback) {
    Axios.post('/login', {name: name, password: password})
        .then(
            function onSuccess(response) {
                window.location.href = response.data;
            },
            function onReject(response) {
                errorCallback(response.status);
            }
        );
}

module.exports = {
    postProjectAndDo,
    postNewProjectAndDo,
    postProjectPairingAndDo,
    getRecommendedPairingAndDo,
    postLoginAndRedirect
};
