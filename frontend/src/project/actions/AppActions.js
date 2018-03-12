import * as settingsCreators from './creators/SettingsCreators.js'
import * as dataThunks from './thunks/DataThunks.js'

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
    resetPairs: dataThunks.resetProjectThunk,
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

