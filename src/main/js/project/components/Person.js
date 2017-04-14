const React = require('react');
const PropTypes = require('prop-types');

class Person extends React.Component {
	render() {
        const id = "pairing_board_" + this.props.pairingBoardIndex + "_person_" + this.props.index;
		return <div id={id} className="person draggable">{this.props.name}</div>
	}
}

Person.propTypes = {
    name: PropTypes.string.isRequired,
    index: PropTypes.number.isRequired,
    pairingBoardIndex: PropTypes.number.isRequired
};

module.exports = Person;
