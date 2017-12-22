import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import Thunk from 'redux-thunk';
import Modal from 'react-modal';

import AppContainer from './containers/AppContainer.js';
import appReducer from './reducers/AppReducer.js';

export default function runProject(projectJSON) {
    //TODO: Remove this when the first thing that page does (componentDidMount on App) is to fetch the project data
    const initialState = {
        data: {
            project: projectJSON
        }
    };

    let store = createStore(appReducer, initialState, applyMiddleware(Thunk));

    ReactDOM.render(
        <Provider store={store}>
            <AppContainer/>
        </Provider>,
        document.getElementById('reactRoot')
    );

    Modal.setAppElement('#reactRoot');
}
