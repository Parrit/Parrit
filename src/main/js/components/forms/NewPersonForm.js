var React = require('react');

var PrimaryButton = require('components/Buttons.js').PrimaryButton;
var SuccessButton = require('components/Buttons.js').SuccessButton;

var NewPersonForm = React.createClass({
    propTypes: {
        confirmFunction: React.PropTypes.func.isRequired,
        cancelFunction: React.PropTypes.func.isRequired
    },

    render: function() {
        return <div>
            <input type="text" value={this.state.name} onChange={this.handleChange}/>
            <SuccessButton name="Save" clickFunction={this.submit}/>
            <PrimaryButton name="Cancel" clickFunction={this.props.cancelFunction}/>
        </div>
    },

    getInitialState: function() {
        return {name: ''};
    },

    handleChange: function(event) {
        this.setState({name: event.target.value});
    },

    submit: function() {
        this.props.confirmFunction(this.state.name);
    }
});

module.exports = NewPersonForm;

