// main.js
var React = require('react');
var ReactDOM = require('react-dom');
var Provider = require('react-redux').Provider;
var Redux = require('redux');

var ReactClasses = require('./js/src/reactClasses.js');
var appReducer = require('./js/src/reducers/appReducer.js');

var appStore = Redux.createStore(appReducer);

function run() {
	ReactDOM.render(
		React.createElement(Provider, {store: appStore},
			React.createElement(ReactClasses.App)
		),
		document.getElementById('app')
	);
}

var loadedStates = ['complete', 'loaded', 'interactive'];

if (loadedStates.includes(document.readyState) && document.body) {
  run();
} else {
  window.addEventListener('DOMContentLoaded', run, false);
}
