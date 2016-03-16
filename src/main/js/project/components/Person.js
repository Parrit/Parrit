var React = require('react');

var Person = React.createClass({
    propTypes: {
        name: React.PropTypes.string.isRequired,
        index: React.PropTypes.number.isRequired,
        pairingBoardIndex: React.PropTypes.number.isRequired
    },

	render: function() {
        var id = "pairing_board_" + this.props.pairingBoardIndex + "_person_" + this.props.index;
		return <div id={id} className="person draggable">{this.props.name}</div>
	}
});

module.exports = Person;
