import { combineReducers } from 'redux';

import projectReducer from 'project/reducers/projectReducer.js';
import pairingHistoryReducer from 'project/reducers/pairingHistoryReducer.js';

export default combineReducers({
    project: projectReducer,
    pairingHistory: pairingHistoryReducer
});
