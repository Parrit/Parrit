var React = require('react');
var PersonList = require('components/PersonList.js');

var Space = React.createClass({
    propTypes: {
        index: React.PropTypes.number.isRequired,
        people: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
        name: React.PropTypes.string.isRequired
    },

    render: function() {
        var spaceIndex = this.props.index;
		return <div id={"space_" + spaceIndex} className="space dropzone well">{this.props.name}
            <PersonList people={this.props.people} index={spaceIndex} />
		</div>
	}
});

module.exports = Space;
