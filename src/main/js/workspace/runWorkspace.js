var React = require('react');
var ReactDOM = require('react-dom');
var ReactRedux = require('react-redux');
var Redux = require('redux');
var Thunk = require('redux-thunk');

var Provider = ReactRedux.Provider;

var AppContainer = require('workspace/containers/AppContainer.js');
var appReducer = require('workspace/reducers/appReducer.js');

function createStore(initialState) {
    var createStoreMW = Redux.applyMiddleware(Thunk)(Redux.createStore);
    return createStoreMW(appReducer, initialState);
}

function runWorkspace(workspaceJSON) {
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

module.exports = runWorkspace;