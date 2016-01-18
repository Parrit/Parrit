// main.js
var React = require('react');
var ReactDOM = require('react-dom');
var Menu = require('./js/src/menu.js');

function run() {
	ReactDOM.render(React.createElement(Menu), document.getElementById('menu'));
}

var loadedStates = ['complete', 'loaded', 'interactive'];

if (loadedStates.includes(document.readyState) && document.body) {
  run();
} else {
  window.addEventListener('DOMContentLoaded', run, false);
}