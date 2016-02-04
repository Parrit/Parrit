var ReactRedux = require('react-redux');
var Person = require('../components/Person.js');

var PersonContainer = ReactRedux.connect(getState, getDispatchFunctions)(Person);

function getState(state) {
	return state.settings;
}

function getDispatchFunctions(dispatch) {
	return {};
}

module.exports = PersonContainer;
