var React = require('react');
var ReactDOM = require('react-dom');

var PersonList = require('project/components/PersonList.js');

var PairingBoard = React.createClass({
    propTypes: {
        name: React.PropTypes.string.isRequired,
        people: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
        index: React.PropTypes.number.isRequired,
        exempt: React.PropTypes.bool.isRequired,
        deletePairingBoard: React.PropTypes.func.isRequired,
        renamePairingBoard: React.PropTypes.func.isRequired
    },

    componentDidUpdate: function() {
        if(this.state.editMode) {
            setTimeout(function () {
                ReactDOM.findDOMNode(this.refs.editName).select();
            }.bind(this), 0);
        }
    },

    render: function() {
        var pairingBoardIndex = this.props.index;

        var pairingBoardClasses = "pairing-board dropzone";
        var pairingBoardNameSection;
        var pairingBoardDeleteSection;

        if (this.state.editMode) {
            pairingBoardClasses += " editing";
            pairingBoardNameSection = <div className="pairing-board-name-wrapper">
                <input ref="editName" className="editing-pairing-board-name" defaultValue={this.props.name}
                       onBlur={this.renamePairingBoard} onKeyDown={this.onKeyDownHandler}/>
            </div>;
        }
        else {
            pairingBoardNameSection = <div className="pairing-board-name-wrapper" onClick={this.enableEditMode}>
                <h3 className="pairing-board-name">{this.props.name}</h3>
                <div className="rename-pairing-board"></div>
            </div>;
        }

        if (this.props.exempt) {
            pairingBoardClasses += " exempt";
            pairingBoardDeleteSection = null;
        }
        else {
            pairingBoardDeleteSection = <div className="delete-pairing-board" onClick={this.deletePairingBoard}></div>;
        }

        return <div id={"pairing_board_" + pairingBoardIndex} className={pairingBoardClasses}>
            <div className="pairing-board-header">
                {pairingBoardNameSection}
                {pairingBoardDeleteSection}
            </div>
            <PersonList people={this.props.people} index={pairingBoardIndex} />
		</div>
	},

    getInitialState: function() {
        return {editMode: false};
    },

    enableEditMode: function() {
        this.setState({editMode: true});
    },

    disableEditMode: function() {
        this.setState({editMode: false});
    },

    onKeyDownHandler: function(event) {
        var EnterKeyCode = 13;
        if(event.keyCode == EnterKeyCode) {
            this.renamePairingBoard(event);
        }
    },

    deletePairingBoard: function() {
        this.props.deletePairingBoard(this.props.index);
    },

    renamePairingBoard: function(newName) {
        this.props.renamePairingBoard(this.props.index, newName.target.value);
        this.disableEditMode();
    }
});

module.exports = PairingBoard;
