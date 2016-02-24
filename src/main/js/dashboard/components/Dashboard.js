var React = require('react');
var Modal = require('react-modal');
var ModalStyles = require('shared/misc/OverrideBullshitModalStyles.js');

var NameForm = require('shared/components/NameForm.js');
var Buttons = require('shared/components/Buttons.js');
var PrimaryButton = Buttons.PrimaryButton;

var Dashboard = React.createClass({
    propTypes: {
        workspaceNames: React.PropTypes.array.isRequired,
        isNewWorkspaceModalOpen: React.PropTypes.bool.isRequired,
        setNewWorkspaceModalOpen: React.PropTypes.func.isRequired,
        createWorkspaceThunk: React.PropTypes.func.isRequired
    },

    render: function() {
        return <div className="dashboard">
            <PrimaryButton name="Add Workspace" clickFunction={this.openNewWorkspaceModal}/>
            <ul className="workspaceList">
                {this.props.workspaceNames.map(function(workspaceName, idx) {
                    return <li key={idx} className="workspaceItem"><a href={'/' + workspaceName}>{workspaceName}</a></li>
                })}
            </ul>
            <Modal isOpen={this.props.isNewWorkspaceModalOpen} onRequestClose={this.closeNewWorkspaceModal} style={ModalStyles}>
                <NameForm confirmFunction={this.createWorkspaceWithName} cancelFunction={this.closeNewWorkspaceModal}/>
            </Modal>
        </div>
    },

    createWorkspaceWithName: function(name) {
        this.props.createWorkspaceThunk(name);
        this.closeNewWorkspaceModal();
    },

    openNewWorkspaceModal: function () {
        this.props.setNewWorkspaceModalOpen(true);
    },

    closeNewWorkspaceModal: function () {
        this.props.setNewWorkspaceModalOpen(false);
    }
});

module.exports = Dashboard;
