var React = require('react');
var ReactDOM = require('react-dom');
var ReactRedux = require('react-redux');
var Redux = require('redux');
var Thunk = require('redux-thunk');

var Provider = ReactRedux.Provider;

function runWorkspace(workspaceJSON) {
    var AppContainer = require('workspace/containers/appContainer.js');
    var appReducer = require('workspace/reducers/appReducer.js');

    function createStore(initialState) {
        var createStoreMW = Redux.applyMiddleware(Thunk)(Redux.createStore);
        return createStoreMW(appReducer, initialState);
    }

    var initialState = {
        settings: {
            isNewPersonModalOpen: false,
            isNewSpaceModalOpen: false
        },
        data: {
            workspace: workspaceJSON
        }
    };

    var store = createStore(initialState);

	ReactDOM.render(
        <Provider store={store}>
            <AppContainer/>
        </Provider>,
		document.getElementById('reactRoot')
	);
}

function runDashboard(workspaces) {
    //function createStore(initialState) {
    //    var createStoreMW = Redux.applyMiddleware(Thunk)(Redux.createStore);
    //    return createStoreMW(appReducer, initialState);
    //}
    //
    //var initialState = {
    //    workspaces: workspaces
    //};
    //
    //var store = createStore(initialState);
    //
    //ReactDOM.render(
    //    <Provider store={store}>
    //        <Dashboard/>
    //    </Provider>,
    //    document.getElementById('reactRoot')
    //);
}

window.runWorkspace = runWorkspace;
window.runDashboard = runDashboard;