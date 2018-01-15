import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { DragSource } from 'react-dnd';
import { getEmptyImage } from 'react-dnd-html5-backend';

class Person extends React.Component {
    render() {
        const {name, connectDragSource} = this.props;

		return connectDragSource(
		    <div className="person">{name}</div>
		)
    }
}

Person.propTypes = {
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    connectDragSource: PropTypes.func.isRequired
};

const dragSpec = {
    beginDrag(props, monitor) {
        return { id: props.id }
    }
};

const dragCollect = (connect, monitor) => {
    return {
        connectDragSource: connect.dragSource()
    }
};

export default DragSource('Person', dragSpec, dragCollect)(Person);
