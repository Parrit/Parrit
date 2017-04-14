const Redux = require('redux');

const projectReducer = require('project/reducers/projectReducer.js');
const pairingHistoryReducer = require('project/reducers/pairingHistoryReducer.js');

const dataReducer = Redux.combineReducers({
    project: projectReducer,
    pairingHistory: pairingHistoryReducer
});

module.exports = dataReducer;
