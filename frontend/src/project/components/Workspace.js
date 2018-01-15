import React from 'react';
import PropTypes from 'prop-types';
import exact from 'prop-types-exact';
import Modal from 'react-modal';

import PersonList from './PersonList.js';
import PersonTrashBin from './PersonTrashBin.js';
import PairingBoard from './PairingBoard.js';
import NameForm from '../../shared/components/NameForm.js';
import ModalStyles from '../../shared/misc/OverrideBullshitModalStyles.js';

class Workspace extends React.Component {
    render() {
        return (
            <div className="workspace">

                <div className="floating-parrits">
                    <h2 className="floating-parrit-title">Floating Parrits</h2>
                    <PersonList people={this.props.people}/>
                    <div className="floating-parrit-actions">
                        <div className="add-parrit-button" onClick={this.openNewPersonModal.bind(this)}/>
                        <PersonTrashBin deletePerson={this.props.deletePerson}/>
                    </div>
                </div>

                <div className="dotted-line"/>

                <div className="pairing-boards-container">
                    <h2 className="pairing-boards-title">Pairing Boards</h2>
                    <div className="pairing-boards">
                        {this.props.pairingBoards.map((pairingBoard, idx) => {
                            return <PairingBoard
                                        key={idx}
                                        pairingBoard={pairingBoard}
                                        editErrorMessage={this.props.settings.pairingBoardErrors[pairingBoard.id]}
                                        renamePairingBoard={this.props.renamePairingBoard}
                                        deletePairingBoard={this.props.deletePairingBoard}
                                        movePerson={this.props.movePerson}
                                    />
                        })}
                    </div>
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

            </div>
        )
    }

    createPersonWithName(name) {
        this.props.createPerson(name, this.closeNewPersonModal.bind(this));
    }

    openNewPersonModal () {
        this.props.setNewPersonModalOpen(true);
    }

    closeNewPersonModal () {
        this.props.setNewPersonModalOpen(false);
    }

    createPairingBoardWithName(name) {
        this.props.createPairingBoard(name, this.closeNewPairingBoardModal.bind(this));
    }

    openNewPairingBoardModal () {
        this.props.setNewPairingBoardModalOpen(true);
    }

    closeNewPairingBoardModal () {
        this.props.setNewPairingBoardModalOpen(false);
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
    setNewPersonModalOpen: PropTypes.func.isRequired,
    setNewPairingBoardModalOpen: PropTypes.func.isRequired
});

export default Workspace;
