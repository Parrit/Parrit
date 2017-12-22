import { combineReducers } from 'redux';

import projectReducer from './ProjectReducer.js';
import pairingHistoryReducer from './PairingHistoryReducer.js';

export default combineReducers({
    project: projectReducer,
    pairingHistory: pairingHistoryReducer
});
