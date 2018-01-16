import React from 'react'
import PropTypes from 'prop-types'
import exact from 'prop-types-exact'
import { DragSource } from 'react-dnd'

class Person extends React.Component {
    render() {
        const {name, connectDragSource} = this.props

        return connectDragSource(
            <div className="person">{name}</div>
        )
    }
}

Person.propTypes = exact({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    connectDragSource: PropTypes.func.isRequired
})

const dragSpec = {
    beginDrag(props) {
        return { id: props.id }
    }
}

const dragCollect = (connect) => {
    return {
        connectDragSource: connect.dragSource()
    }
}

export default DragSource('Person', dragSpec, dragCollect)(Person)
