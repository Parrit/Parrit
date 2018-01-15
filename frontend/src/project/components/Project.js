import React from 'react';
import PropTypes from 'prop-types';
import exact from 'prop-types-exact';

import Workspace from './Workspace.js';
import Button from '../../shared/components/Button.js';

class Project extends React.Component {
    render() {
        const workspaceProps = {
            people: this.props.data.project.people,
            pairingBoards: this.props.data.project.pairingBoards,
            settings: this.props.settings,
            createPerson: this.props.createPerson,
            movePerson: this.props.movePerson,
            deletePerson: this.props.deletePerson,
            createPairingBoard: this.props.createPairingBoard,
            renamePairingBoard: this.props.renamePairingBoard,
            deletePairingBoard: this.props.deletePairingBoard,
            setNewPersonModalOpen: this.props.setNewPersonModalOpen,
            setNewPairingBoardModalOpen: this.props.setNewPairingBoardModalOpen
        };

        return (
            <main className="project">
                <div className="sub-header">
                    <h1 className="project-name">{this.props.data.project.name}</h1>
                    <div className="project-actions">
                        <Button className="button-blue" tooltip="Move All Pairs to Floating" name="Reset Pairs" shortName="Reset" clickFunction={this.props.resetPairs} />
                        <Button className="button-blue" tooltip="Leave one person per pair to keep context" name="Smart Reset" shortName="Smart" clickFunction={this.props.smartReset} />
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

Project.propTypes = exact({
    data: PropTypes.object.isRequired,
    settings: PropTypes.object.isRequired,
    createPerson: PropTypes.func.isRequired,
    movePerson: PropTypes.func.isRequired,
    deletePerson: PropTypes.func.isRequired,
    createPairingBoard: PropTypes.func.isRequired,
    renamePairingBoard: PropTypes.func.isRequired,
    deletePairingBoard: PropTypes.func.isRequired,
    resetPairs: PropTypes.func.isRequired,
    smartReset: PropTypes.func.isRequired,
    getRecommendedPairs: PropTypes.func.isRequired,
    savePairing: PropTypes.func.isRequired,
    setNewPersonModalOpen: PropTypes.func.isRequired,
    setNewPairingBoardModalOpen: PropTypes.func.isRequired
});

export default Project;
