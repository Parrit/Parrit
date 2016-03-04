var React = require('react');
var ReactDOM = require('react-dom');

var PrimaryButton = require('shared/components/Buttons.js').PrimaryButton;
var SuccessButton = require('shared/components/Buttons.js').SuccessButton;

var NameForm = React.createClass({
    propTypes: {
        confirmFunction: React.PropTypes.func.isRequired,
        cancelFunction: React.PropTypes.func.isRequired
    },

    componentDidMount: function() {
        setTimeout(function() {
            ReactDOM.findDOMNode(this.refs.focusInput).focus();
        }.bind(this), 0);
    },

    render: function() {
        return <form onSubmit={this.submit}>
            <input ref="focusInput" type="text" className="form-control" placeholder="Name" value={this.state.name} onChange={this.handleNameChange}/>
            <input type="text" className="form-control" placeholder="Password" value={this.state.password} onChange={this.handlePasswordChange}/>
            <PrimaryButton name="Cancel" clickFunction={this.props.cancelFunction}/>
            <SuccessButton name="Save" type="submit"/>
        </form>
    },

    getInitialState: function() {
        return {name: '', password: ''};
    },

    handleNameChange: function(event) {
        this.setState({name: event.target.value});
    },

    handlePasswordChange: function(event) {
        this.setState({password: event.target.value});
    },

    submit: function(e) {
        e.preventDefault();
        this.props.confirmFunction(this.state.name, this.state.password);
    }
});

module.exports = NameForm;

