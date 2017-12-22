import React from 'react';
import ReactDOM from 'react-dom';
import Modal from 'react-modal';

import ProjectLogin from './components/ProjectLogin.js';

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

    Modal.setAppElement('#reactRoot');
}
