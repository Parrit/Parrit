var React = require('react');

var Person = React.createClass({
    propTypes: {
        name: React.PropTypes.string.isRequired,
        index: React.PropTypes.number.isRequired,
        spaceIndex: React.PropTypes.number.isRequired
    },

	render: function() {
        var id = "space_" + this.props.spaceIndex + "_person_" + this.props.index;
		return <div id={id} className="person draggable">{this.props.name}</div>
	}
});

module.exports = Person;
