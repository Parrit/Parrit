import React from 'react';
import PropTypes from 'prop-types';
import { DragDropContext, DropTarget } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import classNames from 'classnames';

import Header from './Header.js';
import Project from './Project.js';
import PairingHistory from './PairingHistory.js';
import Footer from '../../shared/components/Footer.js';

class App extends React.Component {
	render() {
        const headerProps = {
            setPairingHistoryPanelOpen: this.props.setPairingHistoryPanelOpen,
            isPairingHistoryPanelOpen: this.props.settings.pairingHistoryPanel.isOpen,
            postLogout: this.props.postLogout
        };

        const projectProps = {
            data: this.props.data,
            settings: this.props.settings,
            createPerson: this.props.createPerson,
            movePerson: this.props.movePerson,
            deletePerson: this.props.deletePerson,
            createPairingBoard: this.props.createPairingBoard,
            renamePairingBoard: this.props.renamePairingBoard,
            deletePairingBoard: this.props.deletePairingBoard,
            resetPairs: this.props.resetPairs,
            smartReset: this.props.smartReset,
            getRecommendedPairs: this.props.getRecommendedPairs,
            savePairing: this.props.savePairing,
            setNewPersonModalOpen: this.props.setNewPersonModalOpen,
            setNewPairingBoardModalOpen: this.props.setNewPairingBoardModalOpen,
        };

        const pairingHistoryProps = {
            pairingHistoryList: this.props.data.pairingHistory.pairingHistoryList,
            fetchPairingHistory: this.props.fetchPairingHistory,
            setPairingHistoryPanelOpen: this.props.setPairingHistoryPanelOpen,
            isPairingHistoryPanelOpen: this.props.settings.pairingHistoryPanel.isOpen
        };

        const {connectDropTarget} = this.props;

        const classes = classNames({
            'layout-wrapper': true,
            'project-page-container': true,
            'shift-left': this.props.settings.pairingHistoryPanel.isOpen
        });

		return connectDropTarget(
            <div className={classes}>
                <Header {...headerProps}/>
                <Project {...projectProps}/>
                <Footer/>
                <PairingHistory {...pairingHistoryProps}/>
            </div>
        )
	}
}

App.propTypes = {
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
    fetchPairingHistory: PropTypes.func.isRequired,
    setNewPersonModalOpen: PropTypes.func.isRequired,
    setNewPairingBoardModalOpen: PropTypes.func.isRequired,
    setPairingHistoryPanelOpen: PropTypes.func.isRequired,
    postLogout: PropTypes.func.isRequired,
    connectDropTarget: PropTypes.func.isRequired
};

const dragSpec = {
    drop(props, monitor) {
        if(monitor.didDrop()) return;

        const person = monitor.getItem();
        const floatingPosition = { floating: true, pairingBoardId: undefined }
        props.movePerson(person.id, floatingPosition);
    }
};

const dragCollect = (connect, monitor) => {
    return {
        connectDropTarget: connect.dropTarget()
    };
};

export default DragDropContext(HTML5Backend)(DropTarget('Person', dragSpec, dragCollect)(App));
