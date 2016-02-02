var ReactRedux = require('react-redux');
var Person = require('../components/Person.js');

var PersonContainer = ReactRedux.connect(getStateSettings, getDispatchFunctions)(Person);

function getStateSettings(state) {
	return state.settings;
}

function getDispatchFunctions(dispatch) {
	return {};
}

module.exports = PersonContainer;
