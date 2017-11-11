import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import Thunk from 'redux-thunk';

import DashboardContainer from 'dashboard/containers/DashboardContainer.js';
import dashboardReducer from 'dashboard/reducers/dashboardReducer.js';

export default function runDashboard() {
    const store = createStore(dashboardReducer, applyMiddleware(Thunk));

    ReactDOM.render(
        <Provider store={store}>
            <DashboardContainer/>
        </Provider>,
        document.getElementById('reactRoot')
    );
}
