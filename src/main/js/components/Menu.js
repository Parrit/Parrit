var React = require('react');
var Modal = require('react-modal');

var NewPersonForm = require('components/forms/NewPersonForm.js');
var Buttons = require('components/Buttons.js');
var PrimaryButton = Buttons.PrimaryButton;
var SuccessButton = Buttons.SuccessButton;

var Menu = React.createClass({
    propTypes: {
        enableMove: React.PropTypes.func.isRequired,
        disableMove: React.PropTypes.func.isRequired,
        saveWorkspace: React.PropTypes.func.isRequired,
        createPerson: React.PropTypes.func.isRequired
    },

    render: function() {
        return <div>
            <ul className="menu">
                <PrimaryButton name="Move" clickFunction={this.props.enableMove}/>
                <PrimaryButton name="Don't Move" clickFunction={this.props.disableMove}/>
                <PrimaryButton name="New Person" clickFunction={this.openNewPersonModal}/>
                <SuccessButton name="Save" clickFunction={this.props.saveWorkspace}/>
            </ul>
            <Modal isOpen={this.state.modalIsOpen} onRequestClose={this.closeNewPersonModal}>
                <NewPersonForm confirmFunction={this.createPersonWithName} cancelFunction={this.closeNewPersonModal}/>
            </Modal>
        </div>
    },

    getInitialState: function() {
        return {modalIsOpen: false};
    },

    openNewPersonModal: function() {
        this.setState({modalIsOpen: true});
    },

    createPersonWithName: function(name) {
        this.props.createPerson(name);
        this.closeNewPersonModal();
    },

    closeNewPersonModal: function() {
        this.setState({modalIsOpen: false});
    }
});

module.exports = Menu;
