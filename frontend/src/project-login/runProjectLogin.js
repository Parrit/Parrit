import React from 'react';
import ReactDOM from 'react-dom';

import ProjectLogin from 'project-login/components/ProjectLogin.js';

export default function runProjectLogin(projectName, csrfParameterName, csrfToken) {
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
