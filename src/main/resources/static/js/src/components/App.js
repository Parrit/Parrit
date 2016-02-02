var React = require('react');
var Workspace = require('./Workspace.js');
var Menu = require('./Menu.js');

var App = React.createClass({
	render: function() {
		return React.createElement('div', {className: "container-fluid"},
            React.createElement('div', {className:"row content"},
                        React.createElement('div', {className:"col-sm-3 sidenav"},
							React.createElement('h4', null, "Parrit"),
							React.createElement(Menu)
						),
						React.createElement('div', {className:"col-sm-9 dark"},
							React.createElement('div', {className:"container-fluid workspace"},
								React.createElement(Workspace)
							)
						)
					)
		);
	}
});

module.exports = App;
