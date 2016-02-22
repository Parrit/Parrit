var React = require('react');
var Modal = require('react-modal');
var ModalStyles = require('workspace/misc/OverrideBullshitModalStyles.js');

var NameForm = require('shared/components/NameForm.js');
var Buttons = require('shared/components/Buttons.js');
var PrimaryButton = Buttons.PrimaryButton;

var Menu = React.createClass({
    propTypes: {
        settings: React.PropTypes.object.isRequired,
        createPerson: React.PropTypes.func.isRequired,
        createSpace: React.PropTypes.func.isRequired,
        setNewPersonModalOpen: React.PropTypes.func.isRequired,
        setNewSpaceModalOpen: React.PropTypes.func.isRequired
    },

    render: function() {
        return <div>
            <ul className="menu">
                <PrimaryButton name="Add Person" clickFunction={this.openNewPersonModal}/>
                <PrimaryButton name="Add Space" clickFunction={this.openNewSpaceModal}/>
            </ul>
            <Modal isOpen={this.props.settings.isNewPersonModalOpen} onRequestClose={this.closeNewPersonModal} style={ModalStyles}>
                <NameForm confirmFunction={this.createPersonWithName} cancelFunction={this.closeNewPersonModal}/>
            </Modal>
            <Modal isOpen={this.props.settings.isNewSpaceModalOpen} onRequestClose={this.closeNewSpaceModal} style={ModalStyles}>
                <NameForm confirmFunction={this.createSpaceWithName} cancelFunction={this.closeNewSpaceModal}/>
            </Modal>
        </div>
    },

    createPersonWithName: function(name) {
        this.props.createPerson(name);
        this.closeNewPersonModal();
    },

    openNewPersonModal: function () {
        this.props.setNewPersonModalOpen(true);
    },

    closeNewPersonModal: function () {
        this.props.setNewPersonModalOpen(false);
    },

    createSpaceWithName: function(name) {
        this.props.createSpace(name);
        this.closeNewSpaceModal();
    },

    openNewSpaceModal: function () {
        this.props.setNewSpaceModalOpen(true);
    },

    closeNewSpaceModal: function () {
        this.props.setNewSpaceModalOpen(false);
    }
});

module.exports = Menu;
