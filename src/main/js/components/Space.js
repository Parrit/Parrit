var React = require('react');
var PersonList = require('components/PersonList.js');

var DangerButton = require('components/Buttons.js').DangerButton;

var Space = React.createClass({
    propTypes: {
        name: React.PropTypes.string.isRequired,
        people: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
        index: React.PropTypes.number.isRequired,
        deleteSpace: React.PropTypes.func.isRequired
    },

    render: function() {
        var spaceIndex = this.props.index;
		return <div id={"space_" + spaceIndex} className="space dropzone well">
            <div className="space-header">
                <span className="space-name">{this.props.name}</span>
                <DangerButton name="X" clickFunction={this.deleteSpace} />
            </div>
            <PersonList people={this.props.people} index={spaceIndex} />
		</div>
	},

    deleteSpace: function() {
        this.props.deleteSpace(this.props.index);
    }
});

module.exports = Space;
