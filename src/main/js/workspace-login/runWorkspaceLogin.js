var React = require('react');
var ReactDOM = require('react-dom');

var WorkspaceLogin = require('workspace-login/components/WorkspaceLogin.js');

function runDashboard(workspaceName, csrfParameterName, csrfToken) {
    var props = {
        workspaceName,
        csrfParameterName,
        csrfToken
    };

    ReactDOM.render(
        <WorkspaceLogin {...props}/>,
        document.getElementById('reactRoot')
    );
}

module.exports = runDashboard;