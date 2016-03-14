var React = require('react');

var Button = React.createClass({
    propTypes: {
        name: React.PropTypes.string.isRequired,
        shortName: React.PropTypes.string,
        clickFunction: React.PropTypes.func,
        type: React.PropTypes.string
    },

    render: function () {
        var type = this.props.type || 'button';
        return <button type={type} onClick={this.props.clickFunction}>
            <span className="name">{this.props.name}</span>
            <span className="short-name">{this.props.shortName || this.props.name}</span>
        </button>;
    }
});

module.exports = Button;

