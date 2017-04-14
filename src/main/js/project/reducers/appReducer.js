const Redux = require('redux');

const settingsReducer = require('project/reducers/settingsReducer.js');
const dataReducer = require('project/reducers/dataReducer.js');

const appReducer = Redux.combineReducers({
    settings: settingsReducer,
    data: dataReducer
});

module.exports = appReducer;
