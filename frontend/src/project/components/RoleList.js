import React from 'react';
import PropTypes from 'prop-types';

import Role from './Role.js';

export default class RoleList extends React.Component {
    render() {
        const pairingBoardIndex = this.props.index;

        return (
            <div className="role-list">
                {this.props.roles.map(function (role, idx) {
                    return <Role key={idx} name={role.name} index={idx} pairingBoardIndex={pairingBoardIndex}/>
                })}
            </div>
        )
    }
}

RoleList.propTypes = {
    index: PropTypes.number.isRequired,
    roles: PropTypes.arrayOf(PropTypes.object).isRequired
};
