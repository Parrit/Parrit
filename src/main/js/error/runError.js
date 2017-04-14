const React = require('react');
const ReactDOM = require('react-dom');

const Error = require('error/components/Error.js');

function runError() {
    ReactDOM.render(
        <Error/>,
        document.getElementById('reactRoot')
    );
}

module.exports = runError;