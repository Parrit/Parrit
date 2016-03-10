var React = require('react');
var ReactDOM = require('react-dom');

var Error = require('error/components/Error.js');

function runError() {
    ReactDOM.render(
        <Error/>,
        document.getElementById('reactRoot')
    );
}

module.exports = runError;