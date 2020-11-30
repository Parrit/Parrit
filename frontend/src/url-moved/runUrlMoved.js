import React from 'react'
import ReactDOM from 'react-dom'
import Modal from 'react-modal'

import UrlMoved from './components/UrlMoved.js'

export default function runUrlMoved() {
    ReactDOM.render(
        <UrlMoved/>,
        document.getElementById('reactRoot')
    )

    Modal.setAppElement('#reactRoot')
}
