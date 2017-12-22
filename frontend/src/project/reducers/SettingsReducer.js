import { combineReducers } from 'redux';

import modalReducer from './ModalReducer.js';
import pairingBoardErrorsReducer from './PairingBoardErrorsReducer.js';
import pairingHistoryPanelReducer from './PairingHistoryPanelReducer.js';

export default combineReducers({
    modal: modalReducer,
    pairingBoardErrors: pairingBoardErrorsReducer,
    pairingHistoryPanel: pairingHistoryPanelReducer
});
