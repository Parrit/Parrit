import { combineReducers } from 'redux';

import projectReducer from 'project/reducers/ProjectReducer.js';
import pairingHistoryReducer from 'project/reducers/PairingHistoryReducer.js';

export default combineReducers({
    project: projectReducer,
    pairingHistory: pairingHistoryReducer
});
