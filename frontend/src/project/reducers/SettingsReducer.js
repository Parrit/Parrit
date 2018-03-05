import { combineReducers } from 'redux'

import modalReducer from './ModalReducer.js'
import pairingBoardSettingsReducer from './PairingBoardSettingsReducer.js'
import pairingHistoryPanelReducer from './PairingHistoryPanelReducer.js'

export default combineReducers({
    modal: modalReducer,
    pairingBoardSettings: pairingBoardSettingsReducer,
    pairingHistoryPanel: pairingHistoryPanelReducer
})
