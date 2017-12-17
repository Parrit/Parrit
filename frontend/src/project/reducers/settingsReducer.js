import { combineReducers } from 'redux';

import modalReducer from 'project/reducers/modalReducer.js';
import pairingBoardErrorsReducer from 'project/reducers/pairingBoardErrorsReducer.js';
import pairingHistoryPanelReducer from 'project/reducers/pairingHistoryPanelReducer.js';

export default combineReducers({
    modal: modalReducer,
    pairingBoardErrors: pairingBoardErrorsReducer,
    pairingHistoryPanel: pairingHistoryPanelReducer
});
