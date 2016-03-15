var React = require('react');
var ReactDOM = require('react-dom');

var NameForm = React.createClass({
    propTypes: {
        formTitle: React.PropTypes.string.isRequired,
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
            <div className="form-header">
                <h2 className="form-title">{this.props.formTitle}</h2>
                <div className="form-cancel" onClick={this.props.cancelFunction}></div>
            </div>
            <input ref="input" type="text" className="form-control" placeholder="Name" value={this.state.name} onChange={this.handleChange}/>
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

