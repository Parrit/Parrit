var Redux = require('redux');

var settingsReducer = require('project/reducers/settingsReducer.js');
var dataReducer = require('project/reducers/dataReducer.js');

var appReducer = Redux.combineReducers({
	settings: settingsReducer,
	data: dataReducer
});

module.exports = appReducer;
