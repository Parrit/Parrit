var React = require('react');
var Menu = require('./Menu.js');
var Workspace = require('./Workspace.js');

var App = React.createClass({
    componentDidMount: function() {
        this.props.loadState();
    },
	render: function() {
		return <div className="container-fluid">
			<div className="row content">
				<div className="col-sm-3 sidenav">
					<h4>Parrit</h4>
					<Menu settings={this.props.settings} enableMove={this.props.enableMove} disableMove={this.props.disableMove}/>
				</div>
				<div className="col-sm-9 dark">
					<Workspace workspace={this.props.workspace}/>
				</div>
			</div>
		</div>
	}
});

module.exports = App;
