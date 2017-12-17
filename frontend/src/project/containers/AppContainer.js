import { connect } from 'react-redux';
import App from 'project/components/App.js';
import AppActions from 'project/actions/AppActions.js';

function getState(state) {
    return state;
}

export default connect(getState, AppActions)(App);
