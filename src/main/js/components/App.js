var React = require('react');

var Menu = require('components/Menu.js');
var Workspace = require('components/Workspace.js');

var App = React.createClass({
    propTypes: {
        settings: React.PropTypes.object.isRequired,
        data: React.PropTypes.object.isRequired,
        enableMove: React.PropTypes.func.isRequired,
        disableMove: React.PropTypes.func.isRequired,
        saveWorkspace: React.PropTypes.func.isRequired,
        loadWorkspace: React.PropTypes.func.isRequired,
        movePerson: React.PropTypes.func.isRequired,
        createPerson: React.PropTypes.func.isRequired,
        setNewPersonModalOpen: React.PropTypes.func.isRequired
    },

    componentDidMount: function() {
        this.props.loadWorkspace();
    },

	render: function() {
        var menuProps = {
            settings: this.props.settings,
            enableMove: this.props.enableMove,
            disableMove: this.props.disableMove,
            createPerson: this.props.createPerson,
            saveWorkspace: this.props.saveWorkspace,
            setNewPersonModalOpen: this.props.setNewPersonModalOpen
        };

        var workspaceProps = {
            people: this.props.data.workspace.people,
            spaces: this.props.data.workspace.spaces,
            movePerson: this.props.movePerson
        };

		return <div className="container-fluid">
			<div className="row content">
				<div className="sidenav col-sm-3">
					<h1>Parrit</h1>
					<Menu {...menuProps}/>
				</div>
				<div className="col-sm-9">
					<Workspace {...workspaceProps}/>
				</div>
			</div>
		</div>
	}
});

module.exports = App;
