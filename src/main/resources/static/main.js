// main.js
var React = require('react');
var ReactDOM = require('react-dom');
var ReactRedux = require('react-redux');
var Redux = require('redux');

var App = require('./js/src/components/App.js');
var appReducer = require('./js/src/reducers/appReducer.js');

var appStore = Redux.createStore(appReducer);

function run() {
	ReactDOM.render(
		React.createElement(ReactRedux.Provider, {store: appStore},
			React.createElement(App)
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
