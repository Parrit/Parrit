import React from 'react'
import PropTypes from 'prop-types'
import exact from 'prop-types-exact'
import { DragDropContext, DropTarget } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'
import classNames from 'classnames'

import { dragTypes, dropTypes } from '../DragAndDrop.js'
import Header from './Header.js'
import Project from './Project.js'
import PairingHistory from './PairingHistory.js'
import Footer from '../../shared/components/Footer.js'
import CustomDragLayer from './CustomDragLayer.js'

class App extends React.Component {
	render() {
        const headerProps = {
            setPairingHistoryPanelOpen: this.props.setPairingHistoryPanelOpen,
            isPairingHistoryPanelOpen: this.props.settings.pairingHistoryPanel.isOpen,
            postLogout: this.props.postLogout
        }

        const projectProps = {
            data: this.props.data,
            settings: this.props.settings,
            createPerson: this.props.createPerson,
            movePerson: this.props.movePerson,
            deletePerson: this.props.deletePerson,
            createPairingBoard: this.props.createPairingBoard,
            renamePairingBoard: this.props.renamePairingBoard,
            deletePairingBoard: this.props.deletePairingBoard,
            createRole: this.props.createRole,
            moveRole: this.props.moveRole,
            deleteRole: this.props.deleteRole,
            resetPairs: this.props.resetPairs,
            getRecommendedPairs: this.props.getRecommendedPairs,
            savePairing: this.props.savePairing,
            setNewPersonModalOpen: this.props.setNewPersonModalOpen,
            setNewPairingBoardModalOpen: this.props.setNewPairingBoardModalOpen,
            setNewRoleModalOpen: this.props.setNewRoleModalOpen,
            setPairingBoardEditMode: this.props.setPairingBoardEditMode
        }

        const pairingHistoryProps = {
            pairingHistoryList: this.props.data.pairingHistory.pairingHistoryList,
            fetchPairingHistory: this.props.fetchPairingHistory,
            setPairingHistoryPanelOpen: this.props.setPairingHistoryPanelOpen,
            isPairingHistoryPanelOpen: this.props.settings.pairingHistoryPanel.isOpen
        }

        const {connectDropTarget} = this.props

        const classes = classNames({
            'layout-wrapper': true,
            'project-page-container': true,
            'shift-left': this.props.settings.pairingHistoryPanel.isOpen
        })

		return (
            <React.Fragment>
                {connectDropTarget(
                    <div className={classes}>
                        <Header {...headerProps}/>
                        <Project {...projectProps}/>
                        <Footer/>
                        <PairingHistory {...pairingHistoryProps}/>
                    </div>
                )}

                <CustomDragLayer/>
            </React.Fragment>
        )
	}
}

App.propTypes = exact({
    data: PropTypes.object.isRequired,
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
    resetPairs: PropTypes.func.isRequired,
    getRecommendedPairs: PropTypes.func.isRequired,
    savePairing: PropTypes.func.isRequired,
    fetchPairingHistory: PropTypes.func.isRequired,
    setNewPersonModalOpen: PropTypes.func.isRequired,
    setNewPairingBoardModalOpen: PropTypes.func.isRequired,
    setNewRoleModalOpen: PropTypes.func.isRequired,
    setPairingBoardEditMode: PropTypes.func.isRequired,
    setPairingHistoryPanelOpen: PropTypes.func.isRequired,
    postLogout: PropTypes.func.isRequired,
    connectDropTarget: PropTypes.func.isRequired
})

const dragSpec = {
    drop(props, monitor) {
        if(monitor.didDrop()) return

        return {
            type: dropTypes.Floating
        }
    }
}

const dragCollect = (connect) => {
    return {
        connectDropTarget: connect.dropTarget()
    }
}

export default DragDropContext(HTML5Backend)(DropTarget(dragTypes.Person, dragSpec, dragCollect)(App))
