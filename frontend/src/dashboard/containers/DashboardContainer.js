import { connect } from 'react-redux';
import Dashboard from 'dashboard/components/Dashboard.js';
import DashboardActions from 'dashboard/actions/DashboardActions.js';

function getState(state) {
    return state;
}

export default connect(getState, DashboardActions)(Dashboard);