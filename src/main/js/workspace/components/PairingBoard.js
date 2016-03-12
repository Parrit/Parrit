var React = require('react');
var PersonList = require('workspace/components/PersonList.js');

var DangerButton = require('shared/components/Buttons.js').DangerButton;

var PairingBoard = React.createClass({
    propTypes: {
        name: React.PropTypes.string.isRequired,
        people: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
        index: React.PropTypes.number.isRequired,
        deleteSpace: React.PropTypes.func.isRequired
    },

    render: function() {
        var spaceIndex = this.props.index;
		return <div id={"space_" + spaceIndex} className="pairing-board dropzone">
            <div className="pairing-board-header">
                <span className="pairing-board-name">{this.props.name}</span>
                <div className="delete-pairing-board" onClick={this.deleteSpace}></div>
            </div>
            <PersonList people={this.props.people} index={spaceIndex} />
		</div>
	},

    deleteSpace: function() {
        this.props.deleteSpace(this.props.index);
    }
});

module.exports = PairingBoard;
