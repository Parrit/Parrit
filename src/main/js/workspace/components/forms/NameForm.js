var React = require('react');
var ReactDOM = require('react-dom');

var PrimaryButton = require('workspace/components/Buttons.js').PrimaryButton;
var SuccessButton = require('workspace/components/Buttons.js').SuccessButton;

var NameForm = React.createClass({
    propTypes: {
        confirmFunction: React.PropTypes.func.isRequired,
        cancelFunction: React.PropTypes.func.isRequired
    },

    componentDidMount: function() {
        setTimeout(function() {
            ReactDOM.findDOMNode(this.refs.input).focus();
        }.bind(this), 0);
    },

    render: function() {
        return <form onSubmit={this.submit}>
            <input ref="input" type="text" className="form-control" placeholder="Name" value={this.state.name} onChange={this.handleChange}/>
            <PrimaryButton name="Cancel" clickFunction={this.props.cancelFunction}/>
            <SuccessButton name="Save" type="submit"/>
        </form>
    },

    getInitialState: function() {
        return {name: ''};
    },

    handleChange: function(event) {
        this.setState({name: event.target.value});
    },

    submit: function(e) {
        e.preventDefault();
        this.props.confirmFunction(this.state.name);
    }
});

module.exports = NameForm;

