
import React from 'react'
import PropTypes from 'prop-types'
import exact from 'prop-types-exact'
import { DropTarget } from 'react-dnd'
import { connect } from 'react-redux'
import classNames from 'classnames'

import { deletePairingBoardThunk, deleteRoleThunk, moveRoleThunk, renamePairingBoardThunk } from '../actions/thunks/DataThunks'
import { setNewRoleModalOpenCreator, setPairingBoardEditModeCreator } from '../actions/creators/SettingsCreators'
import { dragTypes, dropTypes } from '../DragAndDrop.js'
import PairingBoardHeader from './PairingBoardHeader.js'
import RoleList from './RoleList.js'
import PersonList from './PersonList.js'

class PairingBoard extends React.Component {
    render() {
        const {name, exempt, people, roles, editMode, editErrorMessage, isOver, connectDropTarget} = this.props

        const pairingBoardClasses = classNames({
            'pairing-board': true,
            'editing': editMode,
            'exempt': exempt,
            'drop-target': isOver
        })

        return connectDropTarget(
            <div className={pairingBoardClasses}>
                <PairingBoardHeader
                    name={name}
                    exempt={exempt}
                    editMode={editMode}
                    editErrorMessage={editErrorMessage}
                    renamePairingBoard={this.renamePairingBoard.bind(this)}
                    deletePairingBoard={this.deletePairingBoard.bind(this)}
                    enableEditMode={this.enableEditMode.bind(this)}
                    openNewRoleModal={this.openNewRoleModal.bind(this)}
                />

                <RoleList
                    roles={roles}
                    moveRole={this.props.moveRole.bind(this, this.props.id)}
                    deleteRole={this.props.deleteRole.bind(this, this.props.id)}
                />

                <PersonList people={people}/>
            </div>
        )
	}

    enableEditMode() {
        this.props.setPairingBoardEditMode(this.props.id, true)
    }

    disableEditMode() {
        this.props.setPairingBoardEditMode(this.props.id, false)
    }

    renamePairingBoard(name) {
        this.props.renamePairingBoard(this.props.id, name, this.disableEditMode.bind(this))
    }

    deletePairingBoard() {
        this.props.deletePairingBoard(this.props.id)
    }

    openNewRoleModal () {
        this.props.setNewRoleModalOpen(this.props.id, true)
    }
}

PairingBoard.propTypes = exact({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    exempt: PropTypes.bool.isRequired,
    people: PropTypes.arrayOf(PropTypes.object).isRequired,
    roles: PropTypes.arrayOf(PropTypes.object).isRequired,
    editMode: PropTypes.bool.isRequired,
    editErrorMessage: PropTypes.string,
    isOver: PropTypes.bool.isRequired,
    renamePairingBoard: PropTypes.func.isRequired,
    deletePairingBoard: PropTypes.func.isRequired,
    moveRole: PropTypes.func.isRequired,
    deleteRole: PropTypes.func.isRequired,
    setPairingBoardEditMode: PropTypes.func.isRequired,
    setNewRoleModalOpen: PropTypes.func.isRequired,
    connectDropTarget: PropTypes.func.isRequired
})

const dragSpec = {
    drop(props, monitor) {
        if(monitor.didDrop()) return

        return {
            type: dropTypes.PairingBoard,
            id: props.id
        }
    }
}

const dragCollect = (connect, monitor) => {
    return {
        isOver: monitor.isOver(),
        connectDropTarget: connect.dropTarget()
    }
}

const mapDispatchToProps = {
    renamePairingBoard: renamePairingBoardThunk,
    deletePairingBoard: deletePairingBoardThunk,
    moveRole: moveRoleThunk,
    deleteRole: deleteRoleThunk,
    setNewRoleModalOpen: setNewRoleModalOpenCreator,
    setPairingBoardEditMode: setPairingBoardEditModeCreator
}

export default DropTarget([dragTypes.Person, dragTypes.Role], dragSpec, dragCollect)(connect(undefined, mapDispatchToProps)(PairingBoard))
