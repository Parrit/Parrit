import React from 'react'
import PropTypes from 'prop-types'
import exact from 'prop-types-exact'
import { DragSource } from 'react-dnd'
import { getEmptyImage } from 'react-dnd-html5-backend'

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
    connectDragSource: PropTypes.func.isRequired,
    connectDragPreview: PropTypes.func.isRequired
})

const dragSpec = {
    beginDrag(props) {
        return {
            id: props.id,
            name: props.name
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

export default DragSource('Person', dragSpec, dragCollect)(Person)
