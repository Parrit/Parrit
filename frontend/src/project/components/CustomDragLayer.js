/* eslint-disable */

import React from 'react'
import PropTypes from 'prop-types'
import exact from 'prop-types-exact'
import { DragLayer } from 'react-dnd'

import { Person } from './Person.js'

const layerStyles = {
	position: 'fixed',
	pointerEvents: 'none',
	zIndex: 100,
	left: 0,
	top: 0,
	width: '100%',
	height: '100%'
}

function getTransformStyle(currentOffset) {
    if(!currentOffset) return { display: 'none' }

    return {
        transform: `translate(${currentOffset.x}px, ${currentOffset.y}px)`
    }
}

class CustomDragLayer extends React.Component {
    render() {
        const {item, itemType, isDragging, currentOffset} = this.props

        if(!isDragging) return null

        return (
            <div style={layerStyles}>
                <div style={getTransformStyle(currentOffset)}>
                    <Person name={item.name}/>
                </div>
            </div>
        )
    }
}

CustomDragLayer.propTypes = exact({
    itemType: PropTypes.string,
    isDragging: PropTypes.bool.isRequired,
    currentOffset: PropTypes.shape({
        x: PropTypes.number.isRequired,
        y: PropTypes.number.isRequired,
    })
})

const dragCollect = (monitor) => {
    return {
        item: monitor.getItem(),
        itemType: monitor.getItemType(),
        isDragging: monitor.isDragging(),
        currentOffset: monitor.getSourceClientOffset()
    }
}

export default DragLayer(dragCollect)(CustomDragLayer)