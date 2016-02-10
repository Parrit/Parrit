var React = require('react');

var Menu = React.createClass({
    propTypes: {
        confirmFunction: React.PropTypes.func.isRequired,
        cancelFunction: React.PropTypes.func.isRequired
    },

    render: function() {
        return <div>
            <input
                type="text"
                value={this.state.name}
                onChange={this.handleChange}
            />
            <button onClick={this.submit}/>
            <button onClick={this.props.cancelFunction}/>
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

