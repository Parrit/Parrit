var Redux = require('redux');

var settingsReducer = require('reducers/settingsReducer.js');
var dataReducer = require('reducers/dataReducer.js');

var appReducer = Redux.combineReducers({
	settings: settingsReducer,
	data: dataReducer
});

module.exports = appReducer;
