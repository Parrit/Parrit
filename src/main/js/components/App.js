var React = require('react');
var Menu = require('components/Menu.js');
var Workspace = require('components/Workspace.js');

var App = React.createClass({
    propTypes: {
        settings: React.PropTypes.object.isRequired,
        workspace: React.PropTypes.object.isRequired,
        enableMove: React.PropTypes.func.isRequired,
        disableMove: React.PropTypes.func.isRequired,
        saveState: React.PropTypes.func.isRequired,
        createPerson: React.PropTypes.func.isRequired
    },

    componentDidMount: function() {
        this.props.loadState();
    },
	render: function() {
        var menuProps = {
            settings: this.props.settings,
            enableMove: this.props.enableMove,
            disableMove: this.props.disableMove,
            createPerson: this.props.createPerson,
            saveState: this.props.saveState
        };

        var workspaceProps = {
            people: this.props.workspace.people,
            spaces: this.props.workspace.spaces,
            movePerson: this.props.movePerson
        };

		return <div className="container-fluid">
			<div className="row content">
				<div className="col-sm-3 sidenav">
					<h4>Parrit</h4>
					<Menu {...menuProps}/>
				</div>
				<div className="col-sm-9 dark">
					<Workspace {...workspaceProps}/>
				</div>
			</div>
		</div>
	}
});

module.exports = App;
