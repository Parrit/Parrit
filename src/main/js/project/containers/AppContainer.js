const ReactRedux = require('react-redux');
const App = require('project/components/App.js');
const AppActions = require('project/actions/appActions.js');

const AppContainer = ReactRedux.connect(getState, AppActions)(App);

function getState(state) {
    return state;
}

module.exports = AppContainer;
