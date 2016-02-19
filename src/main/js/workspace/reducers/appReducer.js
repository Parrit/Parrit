var Redux = require('redux');

var settingsReducer = require('workspace/reducers/settingsReducer.js');
var dataReducer = require('workspace/reducers/dataReducer.js');

var appReducer = Redux.combineReducers({
	settings: settingsReducer,
	data: dataReducer
});

module.exports = appReducer;
