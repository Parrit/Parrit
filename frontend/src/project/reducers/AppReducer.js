import { combineReducers } from 'redux'

import settingsReducer from './SettingsReducer.js'
import dataReducer from './DataReducer.js'

export default combineReducers({
    settings: settingsReducer,
    data: dataReducer
})
