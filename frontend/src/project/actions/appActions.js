import * as dataCreators from 'project/actions/creators/dataCreators.js';
import * as settingsCreators from 'project/actions/creators/settingsCreators.js';
import * as dataThunks from 'project/actions/thunks/dataThunks.js';

function movePersonCombo(...args) {
    return dataThunks.autoSaveThunk(dataCreators.movePersonCreator(...args));
}

function resetPairingBoardCombo() {
    return dataThunks.autoSaveThunk(dataCreators.resetPairingBoardCreator());
}

function smartResetBoardCombo() {
    return dataThunks.autoSaveThunk(dataCreators.smartResetBoard());
}

function deletePersonCombo(...args) {
    return dataThunks.autoSaveThunk(dataCreators.deletePersonCreator(...args));
}

function deletePairingBoardCombo(...args) {
    return dataThunks.autoSaveThunk(dataCreators.deletePairingBoardCreator(...args));
}

export default {
    movePerson: movePersonCombo,
    resetPairs: resetPairingBoardCombo,
    smartReset: smartResetBoardCombo,
    createPerson: dataThunks.addNewPersonThunk,
    createPairingBoard: dataThunks.addNewPairingBoardThunk,
    deletePerson: deletePersonCombo,
    deletePairingBoard: deletePairingBoardCombo,
    renamePairingBoard: dataThunks.renamePairingBoardThunk,
    savePairing: dataThunks.savePairingThunk,
    getRecommendedPairs: dataThunks.getRecommendedPairsThunk,
    fetchPairingHistory: dataThunks.getPairingHistoryThunk,
    postLogout: dataThunks.postLogoutThunk,
    setNewPersonModalOpen: settingsCreators.setNewPersonModalOpenCreator,
    setNewPairingBoardModalOpen: settingsCreators.setNewPairingBoardModalOpenCreator,
    setPairingHistoryPanelOpen: settingsCreators.setPairingHistoryPanelOpenCreator,
};

