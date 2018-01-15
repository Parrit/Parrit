import React from 'react';
import PropTypes from 'prop-types';
import { DropTarget } from 'react-dnd';
import classNames from 'classnames';

class PersonTrashBin extends React.Component {
    render() {
        const {isOver, connectDropTarget} = this.props;

        const classes = classNames({
            'delete-parrit': true,
            'drop-target': isOver
        });

        return connectDropTarget(
            <div className={classes}/>
        )
    }
}

PersonTrashBin.propTypes = {
    isOver: PropTypes.bool.isRequired,
    deletePerson: PropTypes.func.isRequired,
    connectDropTarget: PropTypes.func.isRequired
};

const dragSpec = {
    drop(props, monitor) {
        if(monitor.didDrop()) return;

        const person = monitor.getItem();
        props.deletePerson(person.id);
    }
};

const dragCollect = (connect, monitor) => {
    return {
        isOver: monitor.isOver(),
        connectDropTarget: connect.dropTarget()
    };
};

export default DropTarget('Person', dragSpec, dragCollect)(PersonTrashBin);