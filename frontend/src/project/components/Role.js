import React from 'react'
import PropTypes from 'prop-types'
import exact from 'prop-types-exact'
import { DragSource } from 'react-dnd'
import { getEmptyImage } from 'react-dnd-html5-backend'

import { dragTypes, dropTypes } from '../DragAndDrop.js'

export function renderRole(name) {
    return <div className="role">{name}</div>
}

class Role extends React.Component {
    componentDidMount() {
        this.props.connectDragPreview(getEmptyImage())
    }

	render() {
		const {name, isDragging, connectDragSource} = this.props

        if(isDragging) return null

        return connectDragSource(
            renderRole(name)
        )
	}
}

Role.propTypes = exact({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    isDragging: PropTypes.bool.isRequired,
    moveRole: PropTypes.func.isRequired,
    deleteRole: PropTypes.func.isRequired,
    connectDragSource: PropTypes.func.isRequired,
    connectDragPreview: PropTypes.func.isRequired
})

const dragSpec = {
    beginDrag(props) {
        return {
            name: props.name
        }
    },

    endDrag(props, monitor) {
        if(!monitor.didDrop()) return

        const dropTarget = monitor.getDropResult()

        switch(dropTarget.type) {
            case dropTypes.PairingBoard: {
                const newPosition = { pairingBoardId: dropTarget.id }
                props.moveRole(props.id, newPosition)
                return
            }
            case dropTypes.TrashBin: {
                props.deleteRole(props.id)
                return
            }
        }
    }
}

const dragCollect = (connect, monitor) => {
    return {
        isDragging: monitor.isDragging(),
        connectDragSource: connect.dragSource(),
        connectDragPreview: connect.dragPreview()
    }
}

export default DragSource(dragTypes.Role, dragSpec, dragCollect)(Role)