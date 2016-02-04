require('./lib/interact.js');
require('./lib/drag-drop.js');
require('./lib/drag-drop-override.js');

var React = require('react');
var ReactDOM = require('react-dom');
var ReactRedux = require('react-redux');
var Redux = require('redux');

var AppContainer = require('../containers/appContainer.js');
var appReducer = require('../reducers/appReducer.js');

function run() {
	var appStore = Redux.createStore(appReducer);

	ReactDOM.render(
		React.createElement(ReactRedux.Provider, {store: appStore},
			React.createElement(AppContainer)
		),
		document.getElementById('app')
	);
}

if (['complete', 'loaded', 'interactive'].includes(document.readyState) && document.body) {
  run();
} else {
  window.addEventListener('DOMContentLoaded', run, false);
}
