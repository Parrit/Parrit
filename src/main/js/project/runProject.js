const React = require('react');
const ReactDOM = require('react-dom');
const ReactRedux = require('react-redux');
const Redux = require('redux');
const Thunk = require('redux-thunk').default;

const Provider = ReactRedux.Provider;

const AppContainer = require('project/containers/AppContainer.js');
const appReducer = require('project/reducers/appReducer.js');

function createStore(initialState) {
    const createStoreMW = Redux.applyMiddleware(Thunk)(Redux.createStore);
    return createStoreMW(appReducer, initialState);
}

function runProject(projectJSON) {
    //TODO: Remove this when the first thing that page does (componentDidMount on App) is to fetch the project data
    let initialState = {
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

    let store = createStore(initialState);

    ReactDOM.render(
        <Provider store={store}>
            <AppContainer/>
        </Provider>,
        document.getElementById('reactRoot')
    );
}

module.exports = runProject;