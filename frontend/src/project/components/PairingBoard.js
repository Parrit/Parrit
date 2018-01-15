import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { DropTarget } from 'react-dnd';

import PersonList from './PersonList.js';

class PairingBoard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {editMode: false};
    }

    componentDidUpdate() {
        if(this.state.editMode) {
            setTimeout(function() {
                ReactDOM.findDOMNode(this.refs.editName).focus();
            }.bind(this), 0);
        }
    }

    render() {
        const {isOver, connectDropTarget} = this.props;
        const {id, name, exempt, people} = this.props.pairingBoard;

        let pairingBoardClasses = "pairing-board";
        let pairingBoardNameSection;
        let pairingBoardDeleteSection;

        if (this.state.editMode) {
            pairingBoardClasses += " editing";
            const pairingBoardNameInputClasses = "editing-pairing-board-name" + (this.props.editErrorMessage ? " error" : "");
            pairingBoardNameSection = <div className="pairing-board-name-wrapper">
                <input ref="editName" className={pairingBoardNameInputClasses} defaultValue={name}
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
            pairingBoardClasses += " exempt";
            pairingBoardDeleteSection = null;
        }
        else {
            pairingBoardDeleteSection = <div className="delete-pairing-board" onClick={this.deletePairingBoard.bind(this)}/>;
        }

        pairingBoardClasses += (isOver ? ' drop-target' : '');

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

PairingBoard.propTypes = {
    pairingBoard: PropTypes.object.isRequired,
    editErrorMessage: PropTypes.string,
    isOver: PropTypes.bool.isRequired,
    renamePairingBoard: PropTypes.func.isRequired,
    deletePairingBoard: PropTypes.func.isRequired,
    movePerson: PropTypes.func.isRequired,
    connectDropTarget: PropTypes.func.isRequired
};

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
