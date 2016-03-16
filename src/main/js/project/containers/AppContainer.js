var ReactRedux = require('react-redux');
var App = require('project/components/App.js');
var AppActions = require('project/actions/appActions.js');

var AppContainer = ReactRedux.connect(getState, AppActions)(App);

function getState(state) {
    return state;
}

module.exports = AppContainer;
