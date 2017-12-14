import Axios from 'axios';

Axios.defaults.headers.post['Content-Type'] = 'application/json';

export function postLoginAndRedirect(name, password, errorCallback) {
    Axios.post('/login', {name, password})
        .then(function onSuccess(response) {
            window.location.href = response.data;
        }, function onError(error) {
            errorCallback(error.response.data);
        });
}

export function postLogout() {
    Axios.post('/logout/project')
        .then(function onSuccess() {
            window.location.href = "/";
        });
}

export function postNewProjectAndDo(name, password, successCallback, errorCallback) {
    Axios.post('/api/project', {name, password})
        .then(function onSuccess(response) {
            successCallback(response.data);
        }, function onError(error) {
            errorCallback(error.response.data);
        });
}

export function putProjectAndDo(project, successCallback, errorCallback) {
    Axios.put('/api/project/' + encodeURIComponent(project.id), project)
        .then(function onSuccess(response) {
            successCallback(response.data);
        }, function onError(error) {
            errorCallback(error.response.data);
        });
}

export function postAddNewPersonAndDo(projectId, name, successCallback, errorCallback) {
    Axios.post('/api/project/' + encodeURIComponent(projectId) + '/person', {name})
        .then(function onSuccess(response) {
            successCallback(response.data);
        }, function onError(error) {
            errorCallback(error.response.data);
        });
}

export function postAddNewPairingBoardAndDo(projectId, name, successCallback, errorCallback) {
    Axios.post('/api/project/' + encodeURIComponent(projectId) + '/pairingBoard', {name})
        .then(function onSuccess(response) {
            successCallback(response.data);
        }, function onError(error) {
            errorCallback(error.response.data);
        });
}

export function putPairingBoardAndDo(projectId, pairingBoardId, name, successCallback, errorCallback) {
    Axios.put('/api/project/' + encodeURIComponent(projectId) + '/pairingBoard/' + encodeURIComponent(pairingBoardId), {name})
        .then(function onSuccess(response) {
            successCallback(response.data);
        }, function onError(error) {
            errorCallback(error.response.data);
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

export function getPairingHistoryAndDo(projectId, successCallback) {
    Axios.get('/api/project/' + encodeURIComponent(projectId) + '/pairing/history')
        .then(function onSuccess(response) {
            successCallback(response.data);
        });
}
