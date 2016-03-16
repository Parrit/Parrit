var React = require('react');
var ReactDOM = require('react-dom');
var ReactRedux = require('react-redux');
var Redux = require('redux');
var Thunk = require('redux-thunk');

var Provider = ReactRedux.Provider;

var AppContainer = require('project/containers/AppContainer.js');
var appReducer = require('project/reducers/appReducer.js');

function createStore(initialState) {
    var createStoreMW = Redux.applyMiddleware(Thunk)(Redux.createStore);
    return createStoreMW(appReducer, initialState);
}

function runProject(projectJSON) {
    var initialState = {
        settings: {
            isNewPersonModalOpen: false,
            isNewPairingBoardModalOpen: false
        },
        data: {
            project: projectJSON
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

module.exports = runProject;