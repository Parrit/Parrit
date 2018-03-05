import * as dataCreators from './creators/DataCreators.js'
import * as settingsCreators from './creators/SettingsCreators.js'
import * as dataThunks from './thunks/DataThunks.js'

function resetPairingBoardCombo() {
    return dataThunks.autoSaveThunk(dataCreators.resetPairingBoardCreator())
}

function smartResetBoardCombo() {
    return dataThunks.autoSaveThunk(dataCreators.smartResetBoard())
}

export default {
    createPerson: dataThunks.addNewPersonThunk,
    movePerson: dataThunks.movePersonThunk,
    deletePerson: dataThunks.deletePersonThunk,
    createPairingBoard: dataThunks.addNewPairingBoardThunk,
    renamePairingBoard: dataThunks.renamePairingBoardThunk,
    deletePairingBoard: dataThunks.deletePairingBoardThunk,
    createRole: dataThunks.addNewRoleThunk,
    moveRole: dataThunks.moveRoleThunk,
    deleteRole: dataThunks.deleteRoleThunk,
    resetPairs: resetPairingBoardCombo,
    smartReset: smartResetBoardCombo,
    getRecommendedPairs: dataThunks.getRecommendedPairsThunk,
    savePairing: dataThunks.savePairingThunk,
    fetchPairingHistory: dataThunks.getPairingHistoryThunk,
    setNewPersonModalOpen: settingsCreators.setNewPersonModalOpenCreator,
    setNewPairingBoardModalOpen: settingsCreators.setNewPairingBoardModalOpenCreator,
    setNewRoleModalOpen: settingsCreators.setNewRoleModalOpenCreator,
    setPairingBoardEditMode: settingsCreators.setPairingBoardEditModeCreator,
    setPairingHistoryPanelOpen: settingsCreators.setPairingHistoryPanelOpenCreator,
    postLogout: dataThunks.postLogoutThunk,
}

