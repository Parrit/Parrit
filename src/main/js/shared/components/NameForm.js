var React = require('react');
var ReactDOM = require('react-dom');

var NameForm = React.createClass({
    propTypes: {
        formTitle: React.PropTypes.string.isRequired,
        confirmFunction: React.PropTypes.func.isRequired,
        cancelFunction: React.PropTypes.func.isRequired,
        errorMessage: React.PropTypes.string
    },

    componentDidMount: function() {
        setTimeout(function() {
            ReactDOM.findDOMNode(this.refs.input).focus();
        }.bind(this), 0);
    },

    render: function() {
        var inputClasses = 'form-control';
        inputClasses += this.props.errorMessage.length ? ' error': '';

        return <form onSubmit={this.submit}>
            <div className="form-header">
                <h2 className="form-title">{this.props.formTitle}</h2>
                <div className="form-cancel" onClick={this.props.cancelFunction}></div>
            </div>
            <div className="error-message">{this.props.errorMessage}</div>
            <input className={inputClasses} ref="input" type="text" placeholder="Name" value={this.state.name} onChange={this.handleChange}/>
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

