var Redux = require('redux');

var settingsReducer = require('reducers/settingsReducer.js');
var workspaceReducer = require('reducers/workspaceReducer.js');

var appReducer = Redux.combineReducers({
	settings: settingsReducer,
	workspace: workspaceReducer
});

module.exports = appReducer;
