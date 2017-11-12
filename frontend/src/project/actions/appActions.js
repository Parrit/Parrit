import * as dataCreators from 'project/actions/creators/dataCreators.js';
import * as viewCreators from 'project/actions/creators/viewCreators.js';
import * as dataThunks from 'project/actions/thunks/dataThunks.js';

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

export default {
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

