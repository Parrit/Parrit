var Redux = require('redux');

var workspaceReducer = require('reducers/workspaceReducer.js');

var dataReducer = Redux.combineReducers({
    workspace: workspaceReducer
});

module.exports = dataReducer;
