import React from 'react';
import ReactDOM from 'react-dom';

import Error from 'error/components/Error.js';

export default function runError() {
    ReactDOM.render(
        <Error/>,
        document.getElementById('reactRoot')
    );
}
