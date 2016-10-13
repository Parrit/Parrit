var dataCreators = require('project/actions/creators/dataCreators.js');
var viewCreators = require('project/actions/creators/viewCreators.js');
var dataThunks = require('project/actions/thunks/dataThunks.js');

function movePersonCombo(...args) {
    return dataThunks.autoSaveThunk(dataCreators.movePersonCreator(...args));
}

function resetPairingBoard() {
    return dataThunks.autoSaveThunk(dataCreators.resetPairingBoard());
}

function createPairingBoardCombo(...args) {
    return dataThunks.autoSaveThunk(dataCreators.createPairingBoardCreator(...args));
}

function deletePersonCombo(...args) {
    return dataThunks.autoSaveThunk(dataCreators.deletePersonCreator(...args));
}

function deletePairingBoardCombo(...args) {
    return dataThunks.autoSaveThunk(dataCreators.deletePairingBoardCreator(...args));
}

function renamePairingBoardCombo(...args) {
    return dataThunks.autoSaveThunk(dataCreators.renamePairingBoardCreator(...args));
}

module.exports = {
    movePerson: movePersonCombo,
    resetPairs: resetPairingBoard,
    createPerson: dataThunks.addNewPersonThunk,
    createPairingBoard: createPairingBoardCombo,
    deletePerson: deletePersonCombo,
    deletePairingBoard: deletePairingBoardCombo,
    renamePairingBoard: renamePairingBoardCombo,
    savePairing: dataThunks.savePairingThunk,
    getRecommendedPairs: dataThunks.getRecommendedPairsThunk,
    fetchPairingHistory: dataThunks.getPairingHistoryThunk,
    postLogout: dataThunks.postLogoutThunk,
    setNewPersonModalOpen: viewCreators.setNewPersonModalOpenCreator,
    setNewPairingBoardModalOpen: viewCreators.setNewPairingBoardModalOpenCreator,
    setPairingHistoryPanelOpen: viewCreators.setPairingHistoryPanelOpenCreator,
    setErrorType: viewCreators.setErrorTypeCreator
};

