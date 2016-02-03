require('./lib/interact.js');
require('./lib/drag-drop.js');
require('./lib/drag-drop-override.js');

var React = require('react');
var ReactDOM = require('react-dom');
var ReactRedux = require('react-redux');
var Redux = require('redux');

var App = require('./components/App.js');
var appReducer = require('./reducers/appReducer.js');

var appStore = Redux.createStore(appReducer, {
			settings: {
				canMove: true
			},
			workspace: {
				spaces: [
				    {
				    	name: 'Unallocated',
				    	people: [{
				    		name: 'Joe'
				    	}, {
				    		name: 'Tony'
				    	}, {
				    		name: 'Nick'
				    	}, {
				    		name: 'Nina'
				    	}]
				    }
				]
			}
		});

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
