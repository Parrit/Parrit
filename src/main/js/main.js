require('lib/interact.js');
require('lib/drag-drop.js');
require('lib/drag-drop-override.js');

var React = require('react');
var ReactDOM = require('react-dom');
var ReactRedux = require('react-redux');
var Redux = require('redux');
var Thunk = require('redux-thunk');

var AppContainer = require('containers/appContainer.js');
var appReducer = require('reducers/appReducer.js');

function createStore() {
    var createStoreMW = Redux.applyMiddleware(Thunk)(Redux.createStore);
    return createStoreMW(appReducer);
}

function run() {
	ReactDOM.render(
		React.createElement(ReactRedux.Provider, {store: createStore()},
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
