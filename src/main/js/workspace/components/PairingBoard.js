var React = require('react');
var ReactDOM = require('react-dom');

var PersonList = require('workspace/components/PersonList.js');

var PairingBoard = React.createClass({
    propTypes: {
        name: React.PropTypes.string.isRequired,
        people: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
        index: React.PropTypes.number.isRequired,
        deleteSpace: React.PropTypes.func.isRequired,
        renameSpace: React.PropTypes.func.isRequired
    },

    componentDidUpdate: function() {
        if(this.state.editMode) {
            setTimeout(function () {
                ReactDOM.findDOMNode(this.refs.editName).select();
            }.bind(this), 0);
        }
    },

    render: function() {
        var spaceIndex = this.props.index;

        var pairingBoardClasses = "pairing-board dropzone";
        var pairingBoardNameSection;
        if (this.state.editMode) {
            pairingBoardClasses += " editing";
            pairingBoardNameSection = <div className="pairing-board-name-wrapper">
                <input ref="editName" className="editing-pairing-board-name" defaultValue={this.props.name}
                       onBlur={this.renameSpace} onKeyDown={this.onKeyDownHandler}/>
            </div>;
        }
        else {
            pairingBoardNameSection = <div className="pairing-board-name-wrapper" onClick={this.enableEditMode}>
                <h3 className="pairing-board-name">{this.props.name}</h3>
                <div className="rename-pairing-board"></div>
            </div>;
        }

        return <div id={"space_" + spaceIndex} className={pairingBoardClasses}>
            <div className="pairing-board-header">
                {pairingBoardNameSection}
                <div className="delete-pairing-board" onClick={this.deleteSpace}></div>
            </div>
            <PersonList people={this.props.people} index={spaceIndex} />
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
            this.renameSpace(event);
        }
    },

    deleteSpace: function() {
        this.props.deleteSpace(this.props.index);
    },

    renameSpace: function(newName) {
        this.props.renameSpace(this.props.index, newName.target.value);
        this.disableEditMode();
    }
});

module.exports = PairingBoard;
