var React = require('react');
var ReactDOM = require('react-dom');
var ReactRedux = require('react-redux');
var Redux = require('redux');
var Thunk = require('redux-thunk').default;

var Provider = ReactRedux.Provider;

var DashboardContainer = require('dashboard/containers/DashboardContainer.js');
var dashboardReducer = require('dashboard/reducers/dashboardReducer.js');

function createStore() {
    var createStoreMW = Redux.applyMiddleware(Thunk)(Redux.createStore);
    return createStoreMW(dashboardReducer);
}

function runDashboard() {
    var store = createStore();

    ReactDOM.render(
        <Provider store={store}>
            <DashboardContainer/>
        </Provider>,
        document.getElementById('reactRoot')
    );
}

module.exports = runDashboard;