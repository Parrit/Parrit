var ReactRedux = require('react-redux');
var App = require('workspace/components/App.js');
var AppActions = require('workspace/actions/appActions.js');

var AppContainer = ReactRedux.connect(getState, AppActions)(App);

function getState(state) {
    return state;
}

module.exports = AppContainer;
