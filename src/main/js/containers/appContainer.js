var ReactRedux = require('react-redux');
var App = require('../components/App.js');
var AppActions = require('../actions/appActions.js');

var AppContainer = ReactRedux.connect(getState, AppActions)(App);

function getState(state) {
    return state;
}

module.exports = AppContainer;
