import { combineReducers } from 'redux'

import dataReducer from './DataReducer.js'
import settingsReducer from './SettingsReducer.js'

export default combineReducers({
    data: dataReducer,
    settings: settingsReducer
})
