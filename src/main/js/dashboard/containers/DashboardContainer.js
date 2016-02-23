var ReactRedux = require('react-redux');
var Dashboard = require('dashboard/components/Dashboard.js');
var DashboardActions = require('dashboard/actions/dashboardActions.js');

var DashboardContainer = ReactRedux.connect(getState, DashboardActions)(Dashboard);

function getState(state) {
    return state;
}

module.exports = DashboardContainer;
