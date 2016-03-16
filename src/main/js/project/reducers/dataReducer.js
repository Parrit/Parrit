var Redux = require('redux');

var projectReducer = require('project/reducers/projectReducer.js');

var dataReducer = Redux.combineReducers({
    project: projectReducer
});

module.exports = dataReducer;
