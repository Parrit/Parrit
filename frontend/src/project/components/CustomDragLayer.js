import React from 'react'
import PropTypes from 'prop-types'
import exact from 'prop-types-exact'
import { DragLayer } from 'react-dnd'

import { renderPerson } from './Person.js'

function getTransformStyle(currentOffset) {
    if(!currentOffset) return { display: 'none' }

    return {
        transform: `translate(${currentOffset.x}px, ${currentOffset.y}px)`
    }
}

class CustomDragLayer extends React.Component {
    render() {
        const {item, isDragging, currentOffset} = this.props

        if(!isDragging) return null

        return (
            <div className="drag-layer">
                <div style={getTransformStyle(currentOffset)}>
                    {renderPerson(item.name)}
                </div>
            </div>
        )
    }
}

CustomDragLayer.propTypes = exact({
    item: PropTypes.object,
    isDragging: PropTypes.bool.isRequired,
    currentOffset: PropTypes.shape({
        x: PropTypes.number.isRequired,
        y: PropTypes.number.isRequired
    })
})

const dragCollect = (monitor) => {
    return {
        item: monitor.getItem(),
        isDragging: monitor.isDragging(),
        currentOffset: monitor.getSourceClientOffset()
    }
}

export default DragLayer(dragCollect)(CustomDragLayer)