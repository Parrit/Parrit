import React from 'react'
import PropTypes from 'prop-types'
import exact from 'prop-types-exact'
import { DragDropContext, DropTarget } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'
import { connect } from 'react-redux'
import classNames from 'classnames'

import { dragTypes, dropTypes } from '../DragAndDrop.js'
import SystemAlert from './SystemAlert'
import Header from './Header.js'
import Project from './Project.js'
import PairingHistory from './PairingHistory.js'
import Footer from '../../shared/components/Footer.js'
import CustomDragLayer from './CustomDragLayer.js'

class App extends React.Component {
	render() {
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
                        <SystemAlert/>
                        <Header/>
                        <Project/>
                        <Footer/>
                        <PairingHistory/>
                    </div>
                )}

                <CustomDragLayer/>
            </React.Fragment>
        )
	}
}

App.propTypes = exact({
    settings: PropTypes.object.isRequired,
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

function mapStateToProps({settings}) {
    return {
        settings
    }
}

export default DragDropContext(HTML5Backend)(DropTarget(dragTypes.Person, dragSpec, dragCollect)(connect(mapStateToProps, {})(App)))