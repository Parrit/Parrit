const ReactRedux = require('react-redux');
const Dashboard = require('dashboard/components/Dashboard.js');
const DashboardActions = require('dashboard/actions/dashboardActions.js');

const DashboardContainer = ReactRedux.connect(getState, DashboardActions)(Dashboard);

function getState(state) {
    return state;
}

module.exports = DashboardContainer;
