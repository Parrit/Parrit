import { combineReducers } from 'redux';

import settingsReducer from 'project/reducers/SettingsReducer.js';
import dataReducer from 'project/reducers/DataReducer.js';

export default combineReducers({
    settings: settingsReducer,
    data: dataReducer
});
