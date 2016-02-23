var React = require('react');
var ReactDOM = require('react-dom');
var ReactRedux = require('react-redux');
var Redux = require('redux');
var Thunk = require('redux-thunk');

var Provider = ReactRedux.Provider;

var DashboardContainer = require('dashboard/containers/dashboardContainer.js');
var dashboardReducer = require('dashboard/reducers/dashboardReducer.js');

function createStore(initialState) {
    var createStoreMW = Redux.applyMiddleware(Thunk)(Redux.createStore);
    return createStoreMW(dashboardReducer, initialState);
}

function runDashboard(workspaceNames) {
    var initialState = {
        isNewWorkspaceModalOpen: false,
        workspaceNames: workspaceNames
    };

    var store = createStore(initialState);

    ReactDOM.render(
        <Provider store={store}>
            <DashboardContainer/>
        </Provider>,
        document.getElementById('reactRoot')
    );
}

module.exports = runDashboard;