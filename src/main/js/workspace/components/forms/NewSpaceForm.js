var React = require('react');

var PrimaryButton = require('workspace/components/Buttons.js').PrimaryButton;
var SuccessButton = require('workspace/components/Buttons.js').SuccessButton;

var NewSpaceForm = React.createClass({
    propTypes: {
        confirmFunction: React.PropTypes.func.isRequired,
        cancelFunction: React.PropTypes.func.isRequired
    },

    render: function() {
        return <div>
            <input type="text" className="form-control" placeholder="Name" value={this.state.name} onChange={this.handleChange}/>
            <PrimaryButton name="Cancel" clickFunction={this.props.cancelFunction}/>
            <SuccessButton name="Save" clickFunction={this.submit}/>
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

module.exports = NewSpaceForm;

