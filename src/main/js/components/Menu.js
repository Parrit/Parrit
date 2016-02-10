var React = require('react');

var Buttons = require('components/Buttons.js');
var PrimaryButton = Buttons.PrimaryButton;
var SuccessButton = Buttons.SuccessButton;

var Menu = React.createClass({
    propTypes: {
        enableMove: React.PropTypes.func.isRequired,
        disableMove: React.PropTypes.func.isRequired,
        saveState: React.PropTypes.func.isRequired,
        createPerson: React.PropTypes.func.isRequired
    },

    render: function() {
        return <ul className="menu">
            <PrimaryButton name="Move" clickFunction={this.props.enableMove}/>
            <PrimaryButton name="Don't Move" clickFunction={this.props.disableMove}/>
            <PrimaryButton name="New Person" clickFunction={this.props.createPerson}/>
            <SuccessButton name="Save" clickFunction={this.props.saveState}/>
        </ul>
    }
});

module.exports = Menu;
