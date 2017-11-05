const React = require('react');
const ReactDOM = require('react-dom');

const ProjectLogin = require('project-login/components/ProjectLogin.js');

function runProjectLogin(projectName, csrfParameterName, csrfToken) {
    const props = {
        projectName,
        csrfParameterName,
        csrfToken
    };

    ReactDOM.render(
        <ProjectLogin {...props}/>,
        document.getElementById('reactRoot')
    );
}

module.exports = runProjectLogin;