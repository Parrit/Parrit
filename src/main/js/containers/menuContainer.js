var ReactRedux = require('react-redux');
var Menu = require('../components/Menu.js');

var MenuContainer = ReactRedux.connect(getStateSettings, getDispatchFunctions)(Menu);

function getStateSettings(state) {
	return state.settings;
}

function getDispatchFunctions(dispatch) {
	return {
		enableMove: function() {
			dispatch({
				type: 'SET_MOVE',
				canMove: true
			})
		},
		disableMove: function() {
			dispatch({
				type: 'SET_MOVE',
				canMove: false
			})
		},
	}
}

module.exports = MenuContainer;
