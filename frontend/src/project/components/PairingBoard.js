import React from 'react';
import PropTypes from 'prop-types';
import exact from 'prop-types-exact';
import { DropTarget } from 'react-dnd';
import classNames from 'classnames';

import PersonList from './PersonList.js';

class PairingBoard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {editMode: false};
    }

    render() {
        const {isOver, connectDropTarget} = this.props;
        const {id, name, exempt, people} = this.props.pairingBoard;

        let pairingBoardNameSection;
        let pairingBoardDeleteSection;

        if (this.state.editMode) {
            const pairingBoardNameInputClasses = classNames({
                'editing-pairing-board-name': true,
                'error': this.props.editErrorMessage
            });
            pairingBoardNameSection = <div className="pairing-board-name-wrapper">
                <input className={pairingBoardNameInputClasses} autoFocus defaultValue={name}
                    onBlur={this.renamePairingBoard.bind(this)} onKeyDown={this.onKeyDownHandler.bind(this)}/>
                <div className="error-message">{this.props.editErrorMessage}</div>
            </div>;
        }
        else {
            pairingBoardNameSection = <div className="pairing-board-name-wrapper" onClick={this.enableEditMode.bind(this)}>
                <h3 className="pairing-board-name">{name}</h3>
                <div className="rename-pairing-board"/>
            </div>;
        }

        if (exempt) {
            pairingBoardDeleteSection = null;
        }
        else {
            pairingBoardDeleteSection = <div className="delete-pairing-board" onClick={this.deletePairingBoard.bind(this)}/>;
        }

        const pairingBoardClasses = classNames({
            'pairing-board': true,
            'editing': this.state.editMode,
            'exempt': exempt,
            'drop-target': isOver
        });

        return connectDropTarget(
            <div className={pairingBoardClasses}>
                <div className="pairing-board-header">
                    {pairingBoardNameSection}
                    {pairingBoardDeleteSection}
                </div>
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

    onKeyDownHandler(event) {
        const EnterKeyCode = 13;
        if(event.keyCode === EnterKeyCode) {
            this.renamePairingBoard(event);
        }
    }

    deletePairingBoard() {
        this.props.deletePairingBoard(this.props.pairingBoard.id);
    }

    renamePairingBoard(event) {
        this.props.renamePairingBoard(this.props.pairingBoard.id, event.target.value, this.disableEditMode.bind(this));
    }
}

PairingBoard.propTypes = exact({
    pairingBoard: PropTypes.object.isRequired,
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
        const pairingBoardPosition = { floating: false, pairingBoardId: props.pairingBoard.id }
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
