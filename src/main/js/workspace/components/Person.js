var React = require('react');

var Person = React.createClass({
	render: function() {
        var id = "space_" + this.props.spaceIndex + "_person_" + this.props.index;
		return <div id={id} className="person draggable">{this.props.name}</div>
	}
});

module.exports = Person;
