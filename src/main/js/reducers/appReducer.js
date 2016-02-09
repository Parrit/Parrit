var Redux = require('redux');

var stateIdReducer = require('reducers/stateIdReducer.js');
var settingsReducer = require('reducers/settingsReducer.js');
var workspaceReducer = require('reducers/workspaceReducer.js');

var appReducer = Redux.combineReducers({
    id: stateIdReducer,
	settings: settingsReducer,
	workspace: workspaceReducer
});

module.exports = appReducer;
