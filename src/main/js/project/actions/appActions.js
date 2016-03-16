var dataCreators = require('project/actions/creators/dataCreators.js');
var viewCreators = require('project/actions/creators/viewCreators.js');
var dataThunks = require('project/actions/thunks/dataThunks.js');

function movePersonCombo(...args) {
    return dataThunks.autoSaveThunk(dataCreators.movePersonCreator(...args));
}

function createPersonCombo(...args) {
    return dataThunks.autoSaveThunk(dataCreators.createPersonCreator(...args));
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
    createPerson: createPersonCombo,
    createPairingBoard: createPairingBoardCombo,
    deletePerson: deletePersonCombo,
    deletePairingBoard: deletePairingBoardCombo,
    renamePairingBoard: renamePairingBoardCombo,
    savePairing: dataThunks.savePairingThunk,
    getRecommendedPairs: dataThunks.getRecommendedPairsThunk,
    setNewPersonModalOpen: viewCreators.setNewPersonModalOpenCreator,
    setNewPairingBoardModalOpen: viewCreators.setNewPairingBoardModalOpenCreator
};

