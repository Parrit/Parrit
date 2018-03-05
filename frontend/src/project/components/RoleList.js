import React from 'react'
import PropTypes from 'prop-types'
import exact from 'prop-types-exact'

import Role from './Role.js'

class RoleList extends React.Component {
    render() {
        return (
            <div className="role-list">
                {this.props.roles.map((role, idx) => {
                    return <Role
                                key={idx}
                                id={role.id}
                                name={role.name}
                                moveRole={this.props.moveRole}
                                deleteRole={this.props.deleteRole}
                            />
                })}
            </div>
        )
    }
}

RoleList.propTypes = exact({
    roles: PropTypes.arrayOf(PropTypes.object).isRequired,
    moveRole: PropTypes.func.isRequired,
    deleteRole: PropTypes.func.isRequired
})

export default RoleList