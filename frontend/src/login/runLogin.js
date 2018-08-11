import React from 'react'
import ReactDOM from 'react-dom'
import Modal from 'react-modal'

import Login from './components/Login.js'

export default function runLogin(projectName, csrfParameterName, csrfToken) {
    const props = {
        projectName,
        csrfParameterName,
        csrfToken
    }

    ReactDOM.render(
        <Login {...props}/>,
        document.getElementById('reactRoot')
    )

    Modal.setAppElement('#reactRoot')
}
