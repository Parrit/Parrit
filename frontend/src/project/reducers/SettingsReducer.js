import { combineReducers } from 'redux';

import modalReducer from 'project/reducers/ModalReducer.js';
import pairingBoardErrorsReducer from 'project/reducers/PairingBoardErrorsReducer.js';
import pairingHistoryPanelReducer from 'project/reducers/PairingHistoryPanelReducer.js';

export default combineReducers({
    modal: modalReducer,
    pairingBoardErrors: pairingBoardErrorsReducer,
    pairingHistoryPanel: pairingHistoryPanelReducer
});
