import Axios from 'axios';

Axios.defaults.headers.post['Content-Type'] = 'application/json';

export function postProjectAndDo(project, successCallback, errorCallback) {
    Axios.post('/api/project', project)
        .then(function onSuccess(response) {
            successCallback(response.data);
        }, function onError(error) {
            errorCallback(error.response.status);
        });
}

export function postNewProjectAndDo(name, password, successCallback, errorCallback) {
    Axios.post('/api/project/new', {name, password})
        .then(function onSuccess(response) {
            successCallback(response.data);
        }, function onError(error) {
            errorCallback(error.response.status);
        });
}

export function postProjectPairingAndDo(projectId, successCallback) {
    Axios.post('/api/project/' + encodeURIComponent(projectId) + '/pairing')
        .then(function onSuccess(response) {
            successCallback(response.data);
        })
}

export function getRecommendedPairingAndDo(projectId, successCallback) {
    Axios.get('/api/project/' + encodeURIComponent(projectId) + '/pairing/recommend')
        .then(function onSuccess(response) {
            successCallback(response.data);
        });
}

export function postLoginAndRedirect(name, password, errorCallback) {
    Axios.post('/login', {name: name, password: password})
        .then(function onSuccess(response) {
            window.location.href = response.data;
        }, function onError(error) {
            errorCallback(error.response.status);
        });
}

export function postAddNewPersonAndDo(projectId, name, successCallback, errorCallback) {
    Axios.post('/api/project/' + encodeURIComponent(projectId) + '/addPerson', {name: name})
        .then(function onSuccess(response) {
            successCallback(response.data);
        }, function onError(error) {
            errorCallback(error.response.status);
        });
}

export function getPairingHistoryAndDo(projectId, successCallback) {
    Axios.get('/api/project/' + encodeURIComponent(projectId) + '/pairing/history')
        .then(function onSuccess(response) {
            successCallback(response.data);
        });
}

export function postLogout() {
    Axios.post('/logout/project')
        .then(function onSuccess() {
            window.location.href = "/";
        });
}
