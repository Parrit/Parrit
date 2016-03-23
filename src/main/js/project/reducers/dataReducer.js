var Redux = require('redux');

var projectReducer = require('project/reducers/projectReducer.js');
var pairingHistoryReducer = require('project/reducers/pairingHistoryReducer.js');

var dataReducer = Redux.combineReducers({
    project: projectReducer,
    pairingHistory: pairingHistoryReducer
});

module.exports = dataReducer;
