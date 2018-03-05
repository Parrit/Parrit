import React from 'react'
import PropTypes from 'prop-types'
import exact from 'prop-types-exact'
import { DropTarget } from 'react-dnd'
import classNames from 'classnames'

import { dragTypes, dropTypes } from '../DragAndDrop.js'

class TrashBin extends React.Component {
    render() {
        const {isOver, connectDropTarget} = this.props

        const classes = classNames({
            'trash-bin': true,
            'drop-target': isOver
        })

        return connectDropTarget(
            <div className={classes}/>
        )
    }
}

TrashBin.propTypes = exact({
    isOver: PropTypes.bool.isRequired,
    connectDropTarget: PropTypes.func.isRequired
})

const dragSpec = {
    drop(props, monitor) {
        if(monitor.didDrop()) return

        return {
            type: dropTypes.TrashBin
        }
    }
}

const dragCollect = (connect, monitor) => {
    return {
        isOver: monitor.isOver(),
        connectDropTarget: connect.dropTarget()
    }
}

export default DropTarget([dragTypes.Person, dragTypes.Role], dragSpec, dragCollect)(TrashBin)