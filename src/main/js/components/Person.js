var React = require('react');

var Person = React.createClass({
	render: function() {
		var classes = (this.props.canMove) ? "draggable drag-drop" : "no-draggable drag-drop";
		return <div className={classes}>{this.props.name}</div>;
	}
});

module.exports = Person;
