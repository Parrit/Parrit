import React from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-modal';
import ModalStyles from 'shared/misc/OverrideBullshitModalStyles.js';

import PersonList from 'project/components/PersonList.js';
import PairingBoard from 'project/components/PairingBoard.js';
import NameForm from 'shared/components/NameForm.js';

export default class Workspace extends React.Component {
    render() {
        let newPersonModalErrorMessage = '';
        switch(this.props.settings.errorType) {
            case 0:
                break;
            case 406:
                newPersonModalErrorMessage = 'Hey! This name is too long... 100 characters max.';
                break;
            default:
                newPersonModalErrorMessage = 'Unknown error.';
                break;
        }

        const deletePairingBoard = this.props.deletePairingBoard;
        const renamePairingBoard = this.props.renamePairingBoard;

        return <div className="workspace">

            <div className="floating-parrits">
                <h2 className="floating-parrit-title">Floating Parrits</h2>
                <PersonList people={this.props.people} index={-1} />
                <div className="floating-parrit-actions">
                    <div className="add-parrit-button" onClick={this.openNewPersonModal.bind(this)}/>
                    <div className="delete-parrit"/>
                </div>
            </div>

            <div className="dotted-line"/>

            <div className="pairing-boards-container">
                <h2 className="pairing-boards-title">Pairing Boards</h2>
                <div className="pairing-boards">
                    {this.props.pairingBoards.map(function (pairingBoard, idx) {
                        return <PairingBoard
                                            key={idx}
                                            name={pairingBoard.name}
                                            people={pairingBoard.people}
                                            index={idx}
                                            exempt={pairingBoard.exempt}
                                            deletePairingBoard={deletePairingBoard}
                                            renamePairingBoard={renamePairingBoard}/>;
                    })}
                </div>
                <div className="add-board-button" onClick={this.openNewPairingBoardModal.bind(this)}/>
            </div>

            <Modal isOpen={this.props.settings.isNewPersonModalOpen} onRequestClose={this.closeNewPersonModal.bind(this)} style={ModalStyles} contentLabel="New Person Modal">
                <NameForm formTitle="Add Parrit Teammate" confirmFunction={this.createPersonWithName.bind(this)} cancelFunction={this.closeNewPersonModal.bind(this)}
                            errorMessage={newPersonModalErrorMessage}/>
            </Modal>
            <Modal isOpen={this.props.settings.isNewPairingBoardModalOpen} onRequestClose={this.closeNewPairingBoardModal.bind(this)} style={ModalStyles} contentLabel="New Pairing Board Modal">
                <NameForm formTitle="Add Pairing Board" confirmFunction={this.createPairingBoardWithName.bind(this)} cancelFunction={this.closeNewPairingBoardModal.bind(this)}
                          errorMessage=''/>
            </Modal>

        </div>
    }

    createPersonWithName(name) {
        this.props.createPerson(this.props.projectId, name, this.closeNewPersonModal.bind(this));
    }

    openNewPersonModal () {
        this.props.setNewPersonModalOpen(true);
    }

    closeNewPersonModal () {
        this.props.setNewPersonModalOpen(false);
        this.props.setErrorType(0);
    }

    createPairingBoardWithName(name) {
        this.props.createPairingBoard(name);
        this.closeNewPairingBoardModal();
    }

    openNewPairingBoardModal () {
        this.props.setNewPairingBoardModalOpen(true);
    }

    closeNewPairingBoardModal () {
        this.props.setNewPairingBoardModalOpen(false);
    }
}

Workspace.propTypes = {
    projectId: PropTypes.number.isRequired,
    settings: PropTypes.object.isRequired,
    people: PropTypes.arrayOf(PropTypes.object).isRequired,
    pairingBoards: PropTypes.arrayOf(PropTypes.object).isRequired,
    setNewPersonModalOpen: PropTypes.func.isRequired,
    setNewPairingBoardModalOpen: PropTypes.func.isRequired,
    setErrorType: PropTypes.func.isRequired,
    createPerson: PropTypes.func.isRequired,
    createPairingBoard: PropTypes.func.isRequired,
    deletePairingBoard: PropTypes.func.isRequired,
    renamePairingBoard: PropTypes.func.isRequired
};
