import React from 'react';
import PropTypes from 'prop-types';
import exact from 'prop-types-exact';
import { DropTarget } from 'react-dnd';
import classNames from 'classnames';

import PairingBoardHeader from './PairingBoardHeader.js';
import PersonList from './PersonList.js';

class PairingBoard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {editMode: false};
    }

    render() {
        const {name, exempt, people, editErrorMessage, isOver, connectDropTarget} = this.props;

        const pairingBoardClasses = classNames({
            'pairing-board': true,
            'editing': this.state.editMode,
            'exempt': exempt,
            'drop-target': isOver
        });

        return connectDropTarget(
            <div className={pairingBoardClasses}>
                <PairingBoardHeader
                    name={name}
                    exempt={exempt}
                    editMode={this.state.editMode}
                    editErrorMessage={editErrorMessage}
                    renamePairingBoard={this.renamePairingBoard.bind(this)}
                    deletePairingBoard={this.deletePairingBoard.bind(this)}
                    enableEditMode={this.enableEditMode.bind(this)}
                />
                <PersonList people={people}/>
            </div>
		)
	}

    enableEditMode() {
        this.setState({editMode: true});
    }

    disableEditMode() {
        this.setState({editMode: false});
    }

    renamePairingBoard(name) {
        this.props.renamePairingBoard(this.props.id, name, this.disableEditMode.bind(this));
    }

    deletePairingBoard() {
        this.props.deletePairingBoard(this.props.id);
    }
}

PairingBoard.propTypes = exact({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    exempt: PropTypes.bool.isRequired,
    people: PropTypes.arrayOf(PropTypes.object).isRequired,
    editErrorMessage: PropTypes.string,
    isOver: PropTypes.bool.isRequired,
    renamePairingBoard: PropTypes.func.isRequired,
    deletePairingBoard: PropTypes.func.isRequired,
    movePerson: PropTypes.func.isRequired,
    connectDropTarget: PropTypes.func.isRequired
});

const dragSpec = {
    drop(props, monitor) {
        if(monitor.didDrop()) return;

        const person = monitor.getItem();
        const pairingBoardPosition = { floating: false, pairingBoardId: props.id }
        props.movePerson(person.id, pairingBoardPosition);
    }
};

const dragCollect = (connect, monitor) => {
    return {
        isOver: monitor.isOver(),
        connectDropTarget: connect.dropTarget()
    };
};

export default DropTarget('Person', dragSpec, dragCollect)(PairingBoard);
