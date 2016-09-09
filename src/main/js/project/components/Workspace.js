var React = require('react');
var Modal = require('react-modal');
var ModalStyles = require('shared/misc/OverrideBullshitModalStyles.js');

var PersonList = require('project/components/PersonList.js');
var PairingBoard = require('project/components/PairingBoard.js');
var NameForm = require('shared/components/NameForm.js');

var Workspace = React.createClass({
    propTypes: {
        projectId: React.PropTypes.number.isRequired,
        settings: React.PropTypes.object.isRequired,
        people: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
        pairingBoards: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
        setNewPersonModalOpen: React.PropTypes.func.isRequired,
        setNewPairingBoardModalOpen: React.PropTypes.func.isRequired,
        setErrorType: React.PropTypes.func.isRequired,
        createPerson: React.PropTypes.func.isRequired,
        createPairingBoard: React.PropTypes.func.isRequired,
        deletePairingBoard: React.PropTypes.func.isRequired,
        renamePairingBoard: React.PropTypes.func.isRequired
    },

    render: function() {
        var newPersonModalErrorMessage = '';
        switch(this.props.settings.errorType) {
            case 0:
                break;
            case 406:
                newPersonModalErrorMessage = 'Hey! This name is too long... 10 characters max.';
                break;
            default:
                newPersonModalErrorMessage = 'Unknown error.';
                break;
        }

        var deletePairingBoard = this.props.deletePairingBoard;
        var renamePairingBoard = this.props.renamePairingBoard;

        return <div className="workspace">

            <div className="floating-parrits">
                <h2 className="floating-parrit-title">Floating Parrits</h2>
                <PersonList people={this.props.people} index={-1} />
                <div className="floating-parrit-actions">
                    <div className="add-parrit-button" onClick={this.openNewPersonModal}></div>
                    <div className="delete-parrit"></div>
                </div>
            </div>

            <div className="dotted-line"></div>

            <div className="pairing-boards-container">
                <h2 className="pairing-boards-title">Pairing Boards</h2>
                <div className="pairing-boards">
                    {this.props.pairingBoards.map(function (pairingBoard, idx) {
                        var exempt = pairingBoard.exempt ? true : false;
                        return <PairingBoard
                                            key={idx}
                                            name={pairingBoard.name}
                                            people={pairingBoard.people}
                                            index={idx}
                                            exempt={exempt}
                                            deletePairingBoard={deletePairingBoard}
                                            renamePairingBoard={renamePairingBoard}/>;
                    })}
                </div>
                <div className="add-board-button" onClick={this.openNewPairingBoardModal}></div>
            </div>

            <Modal isOpen={this.props.settings.isNewPersonModalOpen} onRequestClose={this.closeNewPersonModal} style={ModalStyles}>
                <NameForm formTitle="Add Parrit Teammate" confirmFunction={this.createPersonWithName} cancelFunction={this.closeNewPersonModal}
                            errorMessage={newPersonModalErrorMessage}/>
            </Modal>
            <Modal isOpen={this.props.settings.isNewPairingBoardModalOpen} onRequestClose={this.closeNewPairingBoardModal} style={ModalStyles}>
                <NameForm formTitle="Add Pairing Board" confirmFunction={this.createPairingBoardWithName} cancelFunction={this.closeNewPairingBoardModal}
                          errorMessage=''/>
            </Modal>

        </div>
    },

    createPersonWithName: function(name) {
        this.props.createPerson(this.props.projectId, name, this.closeNewPersonModal);
    },

    openNewPersonModal: function () {
        this.props.setNewPersonModalOpen(true);
    },

    closeNewPersonModal: function () {
        this.props.setNewPersonModalOpen(false);
        this.props.setErrorType(0);
    },

    createPairingBoardWithName: function(name) {
        this.props.createPairingBoard(name);
        this.closeNewPairingBoardModal();
    },

    openNewPairingBoardModal: function () {
        this.props.setNewPairingBoardModalOpen(true);
    },

    closeNewPairingBoardModal: function () {
        this.props.setNewPairingBoardModalOpen(false);
    }
});

module.exports = Workspace;
