var React = require('react');

var Menu = require('components/Menu.js');
var Workspace = require('components/Workspace.js');

var App = React.createClass({
    propTypes: {
        settings: React.PropTypes.object.isRequired,
        data: React.PropTypes.object.isRequired,

        loadWorkspace: React.PropTypes.func.isRequired,

        movePerson: React.PropTypes.func.isRequired,
        createPerson: React.PropTypes.func.isRequired,
        createSpace: React.PropTypes.func.isRequired,
        deletePerson: React.PropTypes.func.isRequired,
        deleteSpace: React.PropTypes.func.isRequired,

        setNewPersonModalOpen: React.PropTypes.func.isRequired,
        setNewSpaceModalOpen: React.PropTypes.func.isRequired
    },

    componentDidMount: function() {
        this.props.loadWorkspace();
    },

	render: function() {
        var menuProps = {
            settings: this.props.settings,

            createPerson: this.props.createPerson,
            createSpace: this.props.createSpace,

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
                    <h1>Parrit</h1>
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
