var React = require('react');

var Menu = require('workspace/components/Menu.js');
var Workspace = require('workspace/components/Workspace.js');

var App = React.createClass({
    propTypes: {
        settings: React.PropTypes.object.isRequired,
        createPerson: React.PropTypes.func.isRequired,
        createSpace: React.PropTypes.func.isRequired,
        savePairing: React.PropTypes.func.isRequired,
        setNewPersonModalOpen: React.PropTypes.func.isRequired,
        setNewSpaceModalOpen: React.PropTypes.func.isRequired,

        data: React.PropTypes.object.isRequired,
        movePerson: React.PropTypes.func.isRequired,
        deletePerson: React.PropTypes.func.isRequired,
        deleteSpace: React.PropTypes.func.isRequired
    },

	render: function() {
        var menuProps = {
            settings: this.props.settings,
            createPerson: this.props.createPerson,
            createSpace: this.props.createSpace,
            savePairing: this.props.savePairing,
            setNewPersonModalOpen: this.props.setNewPersonModalOpen,
            setNewSpaceModalOpen: this.props.setNewSpaceModalOpen
        };

        var workspaceProps = {
            people: this.props.data.workspace.people,
            spaces: this.props.data.workspace.spaces,
            movePerson: this.props.movePerson,
            deletePerson: this.props.deletePerson,
            deleteSpace: this.props.deleteSpace
        };

		return <div className="container-fluid">
            <div className="row content">
                <div className="sidenav col-sm-3">
                    <h1 className="workspace-name">{this.props.data.workspace.name}</h1>
                    <Menu {...menuProps}/>
                </div>
                <div className="workspace-wrapper col-sm-9">
                    <Workspace {...workspaceProps}/>
                </div>
            </div>
		</div>
	}
});

module.exports = App;
