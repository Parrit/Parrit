var React = require('react');
var ReactDOM = require('react-dom');

var Dashboard = require('dashboard/components/Dashboard.js');
var DashboardActions = require('dashboard/actions/dashboardActions.js');

function runDashboard() {
    ReactDOM.render(
        <Dashboard {...DashboardActions}/>,
        document.getElementById('reactRoot')
    );
}

module.exports = runDashboard;