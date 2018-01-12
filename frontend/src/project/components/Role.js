import React from 'react';
import PropTypes from 'prop-types';

export default class Role extends React.Component {
	render() {
        const id = "pairing_board_" + this.props.pairingBoardIndex + "_role_" + this.props.index;
		return <div id={id} className="role draggable">{this.props.name}</div>
	}
}

Role.propTypes = {
    name: PropTypes.string.isRequired,
    index: PropTypes.number.isRequired,
    pairingBoardIndex: PropTypes.number.isRequired
};
