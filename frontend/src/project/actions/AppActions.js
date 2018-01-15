import * as dataCreators from './creators/DataCreators.js';
import * as settingsCreators from './creators/SettingsCreators.js';
import * as dataThunks from './thunks/DataThunks.js';

function resetPairingBoardCombo() {
    return dataThunks.autoSaveThunk(dataCreators.resetPairingBoardCreator());
}

function smartResetBoardCombo() {
    return dataThunks.autoSaveThunk(dataCreators.smartResetBoard());
}

export default {
    movePerson: dataThunks.movePersonThunk,
    resetPairs: resetPairingBoardCombo,
    smartReset: smartResetBoardCombo,
    createPerson: dataThunks.addNewPersonThunk,
    deletePerson: dataThunks.deletePersonThunk,
    createPairingBoard: dataThunks.addNewPairingBoardThunk,
    deletePairingBoard: dataThunks.deletePairingBoardThunk,
    renamePairingBoard: dataThunks.renamePairingBoardThunk,
    savePairing: dataThunks.savePairingThunk,
    getRecommendedPairs: dataThunks.getRecommendedPairsThunk,
    fetchPairingHistory: dataThunks.getPairingHistoryThunk,
    postLogout: dataThunks.postLogoutThunk,
    setNewPersonModalOpen: settingsCreators.setNewPersonModalOpenCreator,
    setNewPairingBoardModalOpen: settingsCreators.setNewPairingBoardModalOpenCreator,
    setPairingHistoryPanelOpen: settingsCreators.setPairingHistoryPanelOpenCreator,
};

