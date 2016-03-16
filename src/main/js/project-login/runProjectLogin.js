var React = require('react');
var ReactDOM = require('react-dom');

var ProjectLogin = require('project-login/components/ProjectLogin.js');

function runDashboard(projectName, csrfParameterName, csrfToken) {
    var props = {
        projectName,
        csrfParameterName,
        csrfToken
    };

    ReactDOM.render(
        <ProjectLogin {...props}/>,
        document.getElementById('reactRoot')
    );
}

module.exports = runDashboard;