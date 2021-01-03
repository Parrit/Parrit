"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPairingHistory = exports.getRecommendedPairing = exports.postProjectPairing = exports.deleteRole = exports.putRolePosition = exports.postRole = exports.deletePairingBoard = exports.putPairingBoard = exports.postPairingBoard = exports.deletePerson = exports.putPersonPosition = exports.postPerson = exports.resetProject = exports.postProject = exports.postLogout = exports.postLoginAndRedirect = void 0;
var axios_1 = __importDefault(require("axios"));
axios_1.default.defaults.headers.post["Content-Type"] = "application/json";
function postLoginAndRedirect(name, password) {
    return axios_1.default.post("/api/login", { name: name, password: password }).then(function (response) {
        window.location.href = response.data;
    });
}
exports.postLoginAndRedirect = postLoginAndRedirect;
function postLogout() {
    axios_1.default.post("/api/logout").then(function (response) {
        window.location.href = "/";
    });
}
exports.postLogout = postLogout;
function postProject(name, password) {
    return axios_1.default.post("/api/project", { name: name, password: password });
}
exports.postProject = postProject;
function resetProject(projectId) {
    return axios_1.default.put("/api/project/" + encodeURIComponent(projectId) + "/reset");
}
exports.resetProject = resetProject;
function postPerson(projectId, name) {
    return axios_1.default.post("/api/project/" + encodeURIComponent(projectId) + "/person", {
        name: name,
    });
}
exports.postPerson = postPerson;
function putPersonPosition(projectId, personId, newPosition) {
    return axios_1.default.put("/api/project/" +
        encodeURIComponent(projectId) +
        "/person/" +
        encodeURIComponent(personId) +
        "/position", newPosition);
}
exports.putPersonPosition = putPersonPosition;
function deletePerson(projectId, personId) {
    return axios_1.default.delete("/api/project/" +
        encodeURIComponent(projectId) +
        "/person/" +
        encodeURIComponent(personId));
}
exports.deletePerson = deletePerson;
function postPairingBoard(projectId, name) {
    return axios_1.default.post("/api/project/" + encodeURIComponent(projectId) + "/pairingBoard", { name: name });
}
exports.postPairingBoard = postPairingBoard;
function putPairingBoard(projectId, pairingBoardId, name) {
    return axios_1.default.put("/api/project/" +
        encodeURIComponent(projectId) +
        "/pairingBoard/" +
        encodeURIComponent(pairingBoardId), { name: name });
}
exports.putPairingBoard = putPairingBoard;
function deletePairingBoard(projectId, pairingBoardId) {
    return axios_1.default.delete("/api/project/" +
        encodeURIComponent(projectId) +
        "/pairingBoard/" +
        encodeURIComponent(pairingBoardId));
}
exports.deletePairingBoard = deletePairingBoard;
function postRole(projectId, pairingBoardId, name) {
    return axios_1.default.post("/api/project/" +
        encodeURIComponent(projectId) +
        "/pairingBoard/" +
        encodeURIComponent(pairingBoardId) +
        "/role", { name: name });
}
exports.postRole = postRole;
function putRolePosition(projectId, pairingBoardId, roleId, newPosition) {
    return axios_1.default.put("/api/project/" +
        encodeURIComponent(projectId) +
        "/pairingBoard/" +
        encodeURIComponent(pairingBoardId) +
        "/role/" +
        encodeURIComponent(roleId) +
        "/position", newPosition);
}
exports.putRolePosition = putRolePosition;
function deleteRole(projectId, pairingBoardId, roleId) {
    return axios_1.default.delete("/api/project/" +
        encodeURIComponent(projectId) +
        "/pairingBoard/" +
        encodeURIComponent(pairingBoardId) +
        "/role/" +
        encodeURIComponent(roleId));
}
exports.deleteRole = deleteRole;
function postProjectPairing(projectId) {
    return axios_1.default.post("/api/project/" + encodeURIComponent(projectId) + "/pairing");
}
exports.postProjectPairing = postProjectPairing;
function getRecommendedPairing(projectId) {
    return axios_1.default.get("/api/project/" + encodeURIComponent(projectId) + "/pairing/recommend");
}
exports.getRecommendedPairing = getRecommendedPairing;
function getPairingHistory(projectId) {
    return axios_1.default.get("/api/project/" + encodeURIComponent(projectId) + "/pairing/history").then(function (response) {
        return response.data;
    });
}
exports.getPairingHistory = getPairingHistory;
