// main.js
var React = require('react');
var ReactDOM = require('react-dom');
var App = require('./js/src/app.js');

function run() {
	ReactDOM.render(React.createElement(App), document.getElementById('app'));
}

var loadedStates = ['complete', 'loaded', 'interactive'];

if (loadedStates.includes(document.readyState) && document.body) {
  run();
} else {
  window.addEventListener('DOMContentLoaded', run, false);
}
