var React = require('react');
var Modal = require('react-modal');

var NewPersonForm = require('components/forms/NewPersonForm.js');
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
        setNewPersonModalOpen: React.PropTypes.func.isRequired
    },

    render: function() {
        return <div>
            <ul className="menu">
                <PrimaryButton name="Move" clickFunction={this.props.enableMove}/>
                <PrimaryButton name="Don't Move" clickFunction={this.props.disableMove}/>
                <PrimaryButton name="New Person" clickFunction={this.openNewPersonModal}/>
                <SuccessButton name="Save" clickFunction={this.props.saveWorkspace}/>
            </ul>
            <Modal isOpen={this.props.settings.setNewPersonModalOpen} onRequestClose={this.closeNewPersonModal}>
                <NewPersonForm confirmFunction={this.createPersonWithName} cancelFunction={this.closeNewPersonModal}/>
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
    }
});

module.exports = Menu;
