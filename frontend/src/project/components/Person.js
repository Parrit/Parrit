import React from 'react'
import PropTypes from 'prop-types'
import exact from 'prop-types-exact'
import { DragSource } from 'react-dnd'
import { getEmptyImage } from 'react-dnd-html5-backend'

import { dragTypes, dropTypes } from '../DragAndDrop.js'

export function renderPerson(name) {
    return <div className="person">{name}</div>
}

class Person extends React.Component {
    componentDidMount() {
        this.props.connectDragPreview(getEmptyImage())
    }

    render() {
        const {name, isDragging, connectDragSource} = this.props

        if(isDragging) return null

        return connectDragSource(
            renderPerson(name)
        )
    }
}

Person.propTypes = exact({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    isDragging: PropTypes.bool.isRequired,
    movePerson: PropTypes.func.isRequired,
    deletePerson: PropTypes.func.isRequired,
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
            case dropTypes.Floating: {
                const newPosition = { floating: true, pairingBoardId: undefined }
                props.movePerson(props.id, newPosition)
                return
            }
            case dropTypes.PairingBoard: {
                const newPosition = { floating: false, pairingBoardId: dropTarget.id }
                props.movePerson(props.id, newPosition)
                return
            }
            case dropTypes.TrashBin: {
                props.deletePerson(props.id)
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

export default DragSource(dragTypes.Person, dragSpec, dragCollect)(Person)
