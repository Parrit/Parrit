import React from 'react';
import PropTypes from 'prop-types';

import Workspace from 'project/components/Workspace.js';
import Button from 'shared/components/Button.js';

export default class Project extends React.Component {
    render() {
        const workspaceProps = {
            projectId: this.props.data.project.id,
            settings: this.props.settings,
            people: this.props.data.project.people,
            pairingBoards: this.props.data.project.pairingBoards,
            setNewPersonModalOpen: this.props.setNewPersonModalOpen,
            setNewPairingBoardModalOpen: this.props.setNewPairingBoardModalOpen,
            createPerson: this.props.createPerson,
            createPairingBoard: this.props.createPairingBoard,
            deletePairingBoard: this.props.deletePairingBoard,
            renamePairingBoard: this.props.renamePairingBoard
        };

        return (
            <main className="project">
                <div className="sub-header">
                    <h1 className="project-name">{this.props.data.project.name}</h1>
                    <div className="project-actions">
                        <Button className="button-blue" tooltip="Move All Pairs to Floating" name="Reset Pairs" shortName="Reset" clickFunction={this.props.resetPairs} />
                        <Button className="button-blue" tooltip="Automatically suggest pairings based on last paired date" name="Recommend Pairs" shortName="Recommend" clickFunction={this.props.getRecommendedPairs}/>
                        <Button className="button-green" tooltip="Make note of parings for future recommendations" name="Record Pairs" shortName="Record" clickFunction={this.props.savePairing}/>
                    </div>
                </div>
                <div className="sub-header-dotted-line"/>
                <Workspace {...workspaceProps}/>
            </main>
        )
    }
}

Project.propTypes = {
    savePairing: PropTypes.func.isRequired,
    getRecommendedPairs: PropTypes.func.isRequired,
    resetPairs: PropTypes.func.isRequired,

    settings: PropTypes.object.isRequired,
    data: PropTypes.object.isRequired,
    setNewPersonModalOpen: PropTypes.func.isRequired,
    setNewPairingBoardModalOpen: PropTypes.func.isRequired,
    createPerson: PropTypes.func.isRequired,
    createPairingBoard: PropTypes.func.isRequired,
    deletePairingBoard: PropTypes.func.isRequired,
    renamePairingBoard: PropTypes.func.isRequired
};
