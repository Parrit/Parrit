const React = require('react');
const ReactDOM = require('react-dom');
const PropTypes = require('prop-types');

const PersonList = require('project/components/PersonList.js');

class PairingBoard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {editMode: false};
    }

    componentDidUpdate() {
        if(this.state.editMode) {
            setTimeout(function () {
                ReactDOM.findDOMNode(this.refs.editName).select();
            }.bind(this), 0);
        }
    }

    render() {
        const pairingBoardIndex = this.props.index;

        let pairingBoardClasses = "pairing-board dropzone";
        let pairingBoardNameSection;
        let pairingBoardDeleteSection;

        if (this.state.editMode) {
            pairingBoardClasses += " editing";
            pairingBoardNameSection = <div className="pairing-board-name-wrapper">
                <input ref="editName" className="editing-pairing-board-name" defaultValue={this.props.name}
                       onBlur={this.renamePairingBoard.bind(this)} onKeyDown={this.onKeyDownHandler.bind(this)}/>
            </div>;
        }
        else {
            pairingBoardNameSection = <div className="pairing-board-name-wrapper" onClick={this.enableEditMode.bind(this)}>
                <h3 className="pairing-board-name">{this.props.name}</h3>
                <div className="rename-pairing-board"/>
            </div>;
        }

        if (this.props.exempt) {
            pairingBoardClasses += " exempt";
            pairingBoardDeleteSection = null;
        }
        else {
            pairingBoardDeleteSection = <div className="delete-pairing-board" onClick={this.deletePairingBoard.bind(this)}/>;
        }

        return <div id={"pairing_board_" + pairingBoardIndex} className={pairingBoardClasses}>
            <div className="pairing-board-header">
                {pairingBoardNameSection}
                {pairingBoardDeleteSection}
            </div>
            <PersonList people={this.props.people} index={pairingBoardIndex} />
		</div>
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
        this.props.deletePairingBoard(this.props.index);
    }

    renamePairingBoard(newName) {
        this.props.renamePairingBoard(this.props.index, newName.target.value);
        this.disableEditMode();
    }
}

PairingBoard.propTypes = {
    name: PropTypes.string.isRequired,
    people: PropTypes.arrayOf(PropTypes.object).isRequired,
    index: PropTypes.number.isRequired,
    exempt: PropTypes.bool.isRequired,
    deletePairingBoard: PropTypes.func.isRequired,
    renamePairingBoard: PropTypes.func.isRequired
};

module.exports = PairingBoard;
