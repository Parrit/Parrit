import { combineReducers } from 'redux';

import settingsReducer from 'project/reducers/settingsReducer.js';
import dataReducer from 'project/reducers/dataReducer.js';

export default combineReducers({
    settings: settingsReducer,
    data: dataReducer
});
