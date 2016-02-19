var React = require('react');
var ReactDOM = require('react-dom');

var Dashboard = require('dashboard/components/Dashboard.js');

function runDashboard(workspaceNames) {
    ReactDOM.render(
        <Dashboard workspaceNames={workspaceNames}/>,
        document.getElementById('reactRoot')
    );
}

module.exports = runDashboard;