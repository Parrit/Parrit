import { connect } from 'react-redux';
import App from '../components/App.js';
import AppActions from '../actions/AppActions.js';

function getState(state) {
    return state;
}

export default connect(getState, AppActions)(App);
