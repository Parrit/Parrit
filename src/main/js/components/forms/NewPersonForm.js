var React = require('react');

var Menu = React.createClass({
    propTypes: {
        confirmFunction: React.PropTypes.func.isRequired,
        cancelFunction: React.PropTypes.func.isRequired
    },

    render: function() {
        return <div>
            <input type="text" value={this.state.name} onChange={this.handleChange}/>
            <button className="btn btn-success btn-block" onClick={this.submit}>Save</button>
            <button className="btn btn-primary btn-block" onClick={this.props.cancelFunction}>Cancel</button>
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

module.exports = Menu;

