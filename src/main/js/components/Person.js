var React = require('react');

var Person = React.createClass({
	render: function() {
        var id = "space-" + this.props.spaceIndex + "-person-" + this.props.index;
		var classes = (this.props.canMove) ? "draggable" : "no-draggable";
		return <div id={id} className={"drag-drop " + classes}>{this.props.name}</div>
	}
});

module.exports = Person;
