const React = require('react');
const ReactDOM = require('react-dom');
const ReactRedux = require('react-redux');
const Redux = require('redux');
const Thunk = require('redux-thunk').default;

const Provider = ReactRedux.Provider;

const DashboardContainer = require('dashboard/containers/DashboardContainer.js');
const dashboardReducer = require('dashboard/reducers/dashboardReducer.js');

function createStore() {
    const createStoreMW = Redux.applyMiddleware(Thunk)(Redux.createStore);
    return createStoreMW(dashboardReducer);
}

function runDashboard() {
    const store = createStore();

    ReactDOM.render(
        <Provider store={store}>
            <DashboardContainer/>
        </Provider>,
        document.getElementById('reactRoot')
    );
}

module.exports = runDashboard;