var React = require('react');
var Modal = require('react-modal');
var ModalStyles = require('misc/OverrideBullshitModalStyles.js');

var NewPersonForm = require('components/forms/NewPersonForm.js');
var NewSpaceForm = require('components/forms/NewSpaceForm.js');
var Buttons = require('components/Buttons.js');
var PrimaryButton = Buttons.PrimaryButton;
var SuccessButton = Buttons.SuccessButton;

var Menu = React.createClass({
    propTypes: {
        settings: React.PropTypes.object.isRequired,
        enableMove: React.PropTypes.func.isRequired,
        disableMove: React.PropTypes.func.isRequired,
        saveWorkspace: React.PropTypes.func.isRequired,
        createPerson: React.PropTypes.func.isRequired,
        createSpace: React.PropTypes.func.isRequired,
        setNewPersonModalOpen: React.PropTypes.func.isRequired,
        setNewSpaceModalOpen: React.PropTypes.func.isRequired
    },

    render: function() {
        return <div>
            <ul className="menu">
                <PrimaryButton name="Move" clickFunction={this.props.enableMove}/>
                <PrimaryButton name="Don't Move" clickFunction={this.props.disableMove}/>
                <PrimaryButton name="Add Person" clickFunction={this.openNewPersonModal}/>
                <PrimaryButton name="Add Space" clickFunction={this.openNewSpaceModal}/>
                <SuccessButton name="Save" clickFunction={this.props.saveWorkspace}/>
            </ul>
            <Modal isOpen={this.props.settings.isNewPersonModalOpen} onRequestClose={this.closeNewPersonModal} style={ModalStyles}>
                <NewPersonForm confirmFunction={this.createPersonWithName} cancelFunction={this.closeNewPersonModal}/>
            </Modal>
            <Modal isOpen={this.props.settings.isNewSpaceModalOpen} onRequestClose={this.closeNewSpaceModal} style={ModalStyles}>
                <NewSpaceForm confirmFunction={this.createSpaceWithName} cancelFunction={this.closeNewSpaceModal}/>
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
