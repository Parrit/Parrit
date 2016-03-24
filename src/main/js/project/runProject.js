var React = require('react');
var ReactDOM = require('react-dom');
var ReactRedux = require('react-redux');
var Redux = require('redux');
var Thunk = require('redux-thunk').default;

var Provider = ReactRedux.Provider;

var AppContainer = require('project/containers/AppContainer.js');
var appReducer = require('project/reducers/appReducer.js');

function createStore(initialState) {
    var createStoreMW = Redux.applyMiddleware(Thunk)(Redux.createStore);
    return createStoreMW(appReducer, initialState);
}

function runProject(projectJSON) {
    //TODO: Remove this when the first thing that page does (componentDidMount on App) is to fetch the project data
    var initialState = {
        settings: {
            isNewPersonModalOpen: false,
            isNewPairingBoardModalOpen: false,
            isPairingHistoryPanelOpen: false,
            errorType: 0
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