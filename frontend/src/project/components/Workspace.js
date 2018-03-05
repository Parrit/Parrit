import React from 'react'
import PropTypes from 'prop-types'
import exact from 'prop-types-exact'
import Modal from 'react-modal'

import PersonList from './PersonList.js'
import TrashBin from './TrashBin.js'
import PairingBoardList from './PairingBoardList.js'
import NameForm from '../../shared/components/NameForm.js'
import ModalStyles from '../../shared/misc/OverrideBullshitModalStyles.js'

class Workspace extends React.Component {
    render() {
        return (
            <div className="workspace">

                <div className="floating-parrits">
                    <h2 className="floating-parrit-title">Floating Parrits</h2>

                    <PersonList
                        people={this.props.people}
                        movePerson={this.props.movePerson}
                        deletePerson={this.props.deletePerson}
                    />

                    <div className="floating-parrit-actions">
                        <div className="add-parrit-button" onClick={this.openNewPersonModal.bind(this)}/>
                        <TrashBin/>
                    </div>
                </div>

                <div className="dotted-line"/>

                <div className="pairing-boards-container">
                    <h2 className="pairing-boards-title">Pairing Boards</h2>
                    <PairingBoardList
                        pairingBoards={this.props.pairingBoards}
                        pairingBoardSettings={this.props.settings.pairingBoardSettings}
                        renamePairingBoard={this.props.renamePairingBoard}
                        deletePairingBoard={this.props.deletePairingBoard}
                        movePerson={this.props.movePerson}
                        deletePerson={this.props.deletePerson}
                        moveRole={this.props.moveRole}
                        deleteRole={this.props.deleteRole}
                        setNewRoleModalOpen={this.props.setNewRoleModalOpen}
                        setPairingBoardEditMode={this.props.setPairingBoardEditMode}
                    />
                    <div className="add-board-button" onClick={this.openNewPairingBoardModal.bind(this)}/>
                </div>

                <Modal contentLabel="New Person Modal" isOpen={this.props.settings.modal.isNewPersonModalOpen} onRequestClose={this.closeNewPersonModal.bind(this)} style={ModalStyles}>
                    <NameForm formTitle="Add Parrit Teammate" confirmFunction={this.createPersonWithName.bind(this)}
                        cancelFunction={this.closeNewPersonModal.bind(this)} errorMessage={this.props.settings.modal.newPersonModalErrorMessage}/>
                </Modal>
                <Modal contentLabel="New Pairing Board Modal" isOpen={this.props.settings.modal.isNewPairingBoardModalOpen} onRequestClose={this.closeNewPairingBoardModal.bind(this)} style={ModalStyles}>
                    <NameForm formTitle="Add Pairing Board" confirmFunction={this.createPairingBoardWithName.bind(this)}
                        cancelFunction={this.closeNewPairingBoardModal.bind(this)} errorMessage={this.props.settings.modal.newPairingBoardModalErrorMessage}/>
                </Modal>
                <Modal contentLabel="New Role Modal" isOpen={this.props.settings.modal.isNewRoleModalOpen} onRequestClose={this.closeNewRoleModal.bind(this)} style={ModalStyles}>
                    <NameForm formTitle="Add Pairing Board Role" confirmFunction={this.createRoleWithName.bind(this)}
                        cancelFunction={this.closeNewRoleModal.bind(this)} errorMessage={this.props.settings.modal.newRoleModalErrorMessage}/>
                </Modal>

            </div>
        )
    }

    createPersonWithName(name) {
        this.props.createPerson(name, this.closeNewPersonModal.bind(this))
    }

    openNewPersonModal () {
        this.props.setNewPersonModalOpen(true)
    }

    closeNewPersonModal () {
        this.props.setNewPersonModalOpen(false)
    }

    createPairingBoardWithName(name) {
        this.props.createPairingBoard(name, this.closeNewPairingBoardModal.bind(this))
    }

    openNewPairingBoardModal () {
        this.props.setNewPairingBoardModalOpen(true)
    }

    closeNewPairingBoardModal () {
        this.props.setNewPairingBoardModalOpen(false)
    }

    createRoleWithName(name) {
        const pairingBoardId = this.props.settings.modal.newRolePairingBoardId
        this.props.createRole(pairingBoardId, name, this.closeNewRoleModal.bind(this))
    }

    closeNewRoleModal () {
        this.props.setNewRoleModalOpen(false, undefined)
    }
}

Workspace.propTypes = exact({
    people: PropTypes.arrayOf(PropTypes.object).isRequired,
    pairingBoards: PropTypes.arrayOf(PropTypes.object).isRequired,
    settings: PropTypes.object.isRequired,
    createPerson: PropTypes.func.isRequired,
    movePerson: PropTypes.func.isRequired,
    deletePerson: PropTypes.func.isRequired,
    createPairingBoard: PropTypes.func.isRequired,
    renamePairingBoard: PropTypes.func.isRequired,
    deletePairingBoard: PropTypes.func.isRequired,
    createRole: PropTypes.func.isRequired,
    moveRole: PropTypes.func.isRequired,
    deleteRole: PropTypes.func.isRequired,
    setNewPersonModalOpen: PropTypes.func.isRequired,
    setNewPairingBoardModalOpen: PropTypes.func.isRequired,
    setNewRoleModalOpen: PropTypes.func.isRequired,
    setPairingBoardEditMode: PropTypes.func.isRequired
})

export default Workspace
