var Redux = require('redux');

var settingsReducer = require('./settingsReducer.js');
var workspaceReducer = require('./workspaceReducer.js');

var appReducer = Redux.combineReducers({
	settings: settingsReducer,
	workspace: workspaceReducer
});

module.exports = appReducer;
