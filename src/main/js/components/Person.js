var React = require('react');

var Person = React.createClass({
	render: function() {
        var id = "space_" + this.props.spaceIndex + "_person_" + this.props.index;
		var classes = (this.props.canMove) ? "draggable" : "no-draggable";
		return <div id={id} className={"person " + classes}>{this.props.name}</div>
	}
});

module.exports = Person;
