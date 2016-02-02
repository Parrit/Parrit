var React = require('react');
var MenuContainer = require('../containers/menuContainer.js');
var WorkspaceContainer = require('../containers/WorkspaceContainer.js');

var App = React.createClass({
	render: function() {
		return <div className="container-fluid">
			<div className="row content">
				<div className="col-sm-3 sidenav">
					<h4>Parrit</h4>
					<MenuContainer/>
				</div>
				<div className="col-sm-9 dark">
					<WorkspaceContainer/>
				</div>
			</div>
		</div>
	}
});

module.exports = App;
