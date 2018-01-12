import * as dataCreators from './creators/DataCreators.js';
import * as settingsCreators from './creators/SettingsCreators.js';
import * as dataThunks from './thunks/DataThunks.js';

function moveAssignmentCombo(...args) {
    return dataThunks.autoSaveThunk(dataCreators.moveAssignmentCreator(...args));
}

function resetPairingBoardCombo() {
    return dataThunks.autoSaveThunk(dataCreators.resetPairingBoardCreator());
}

function smartResetBoardCombo() {
    return dataThunks.autoSaveThunk(dataCreators.smartResetBoard());
}

function deleteAssignmentCombo(...args) {
    return dataThunks.autoSaveThunk(dataCreators.deleteAssignmentCreator(...args));
}

function deletePairingBoardCombo(...args) {
    return dataThunks.autoSaveThunk(dataCreators.deletePairingBoardCreator(...args));
}

export default {
    moveAssignment: moveAssignmentCombo,
    resetPairs: resetPairingBoardCombo,
    smartReset: smartResetBoardCombo,
    createPerson: dataThunks.addNewPersonThunk,
    createRole: dataThunks.addNewRoleThunk,
    createPairingBoard: dataThunks.addNewPairingBoardThunk,
    deleteAssignment: deleteAssignmentCombo,
    deletePairingBoard: deletePairingBoardCombo,
    renamePairingBoard: dataThunks.renamePairingBoardThunk,
    savePairing: dataThunks.savePairingThunk,
    getRecommendedPairs: dataThunks.getRecommendedPairsThunk,
    fetchPairingHistory: dataThunks.getPairingHistoryThunk,
    postLogout: dataThunks.postLogoutThunk,
    setNewPersonModalOpen: settingsCreators.setNewPersonModalOpenCreator,
    setNewRoleModalOpen: settingsCreators.setNewRoleModalOpenCreator,
    setNewPairingBoardModalOpen: settingsCreators.setNewPairingBoardModalOpenCreator,
    setPairingHistoryPanelOpen: settingsCreators.setPairingHistoryPanelOpenCreator,
};

