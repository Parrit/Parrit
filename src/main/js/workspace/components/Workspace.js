var React = require('react');
var Modal = require('react-modal');
var ModalStyles = require('shared/misc/OverrideBullshitModalStyles.js');

var PersonList = require('workspace/components/PersonList.js');
var PairingBoard = require('workspace/components/PairingBoard.js');
var NameForm = require('shared/components/NameForm.js');

var Workspace = React.createClass({
    propTypes: {
        settings: React.PropTypes.object.isRequired,
        people: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
        spaces: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
        setNewPersonModalOpen: React.PropTypes.func.isRequired,
        setNewSpaceModalOpen: React.PropTypes.func.isRequired,
        createPerson: React.PropTypes.func.isRequired,
        createSpace: React.PropTypes.func.isRequired,
        deleteSpace: React.PropTypes.func.isRequired
    },

    render: function() {
        var deleteSpace = this.props.deleteSpace;

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
                    {this.props.spaces.map(function (pairingBoard, idx) {
                        return <PairingBoard key={idx} name={pairingBoard.name} people={pairingBoard.people}
                                             index={idx} deleteSpace={deleteSpace}/>;
                    })}
                </div>
                <div className="add-board-button" onClick={this.openNewSpaceModal}></div>
            </div>

            <Modal isOpen={this.props.settings.isNewPersonModalOpen} onRequestClose={this.closeNewPersonModal} style={ModalStyles}>
                <NameForm formTitle="Add Parrit Teammate" confirmFunction={this.createPersonWithName} cancelFunction={this.closeNewPersonModal}/>
            </Modal>
            <Modal isOpen={this.props.settings.isNewSpaceModalOpen} onRequestClose={this.closeNewSpaceModal} style={ModalStyles}>
                <NameForm formTitle="Add Pairing Board" confirmFunction={this.createSpaceWithName} cancelFunction={this.closeNewSpaceModal}/>
            </Modal>

        </div>
    },

    createPersonWithName: function(name) {
        this.props.createPerson(name);
        this.closeNewPersonModal();
    },

    openNewPersonModal: function () {
        this.props.setNewPersonModalOpen(true);
    },

    closeNewPersonModal: function () {
        this.props.setNewPersonModalOpen(false);
    },

    createSpaceWithName: function(name) {
        this.props.createSpace(name);
        this.closeNewSpaceModal();
    },

    openNewSpaceModal: function () {
        this.props.setNewSpaceModalOpen(true);
    },

    closeNewSpaceModal: function () {
        this.props.setNewSpaceModalOpen(false);
    }
});

module.exports = Workspace;
