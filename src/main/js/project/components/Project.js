var React = require('react');

var Workspace = require('project/components/Workspace.js');
var Button = require('shared/components/Button.js');

var Project = React.createClass({
    propTypes: {
        savePairing: React.PropTypes.func.isRequired,
        getRecommendedPairs: React.PropTypes.func.isRequired,
        resetPairs: React.PropTypes.func.isRequired,

        settings: React.PropTypes.object.isRequired,
        data: React.PropTypes.object.isRequired,
        setNewPersonModalOpen: React.PropTypes.func.isRequired,
        setNewPairingBoardModalOpen: React.PropTypes.func.isRequired,
        setErrorType: React.PropTypes.func.isRequired,
        createPerson: React.PropTypes.func.isRequired,
        createPairingBoard: React.PropTypes.func.isRequired,
        deletePairingBoard: React.PropTypes.func.isRequired,
        renamePairingBoard: React.PropTypes.func.isRequired
    },

    render: function() {
        var workspaceProps = {
            projectId: this.props.data.project.id,
            settings: this.props.settings,
            people: this.props.data.project.people,
            pairingBoards: this.props.data.project.pairingBoards,
            setNewPersonModalOpen: this.props.setNewPersonModalOpen,
            setNewPairingBoardModalOpen: this.props.setNewPairingBoardModalOpen,
            setErrorType: this.props.setErrorType,
            createPerson: this.props.createPerson,
            createPairingBoard: this.props.createPairingBoard,
            deletePairingBoard: this.props.deletePairingBoard,
            renamePairingBoard: this.props.renamePairingBoard
        };

        return <div className="project">
            <div className="sub-header">
                <h1 className="project-name">{this.props.data.project.name}</h1>
                <div className="project-actions">
                    <Button className="button-blue" tooltip="Move All Pairs to Floating" name="Reset Pairs" shortName="Reset" clickFunction={this.props.resetPairs} />
                    <Button className="button-blue" tooltip="Automatically suggest pairings based on last paired date" name="Recommend Pairs" shortName="Recommend" clickFunction={this.props.getRecommendedPairs}/>
                    <Button className="button-green" tooltip="Make note of parings for future recommendations" name="Record Pairs" shortName="Record" clickFunction={this.props.savePairing}/>
                </div>
            </div>
            <div className="sub-header-dotted-line"></div>
            <Workspace {...workspaceProps}/>
        </div>
    }
});

module.exports = Project;
