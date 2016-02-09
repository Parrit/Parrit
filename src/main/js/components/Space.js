var React = require('react');
var PersonContainer = require('containers/personContainer.js');

var Space = React.createClass({
	render: function() {
        var spaceIndex = this.props.index;
		return <div id={"space_" + spaceIndex} className="space dropzone well">{this.props.name}
			{this.props.people.map(function (person, idx) {
				return <PersonContainer key={person.name} name={person.name} index={idx} spaceIndex={spaceIndex}/>
			})}
		</div>
	}
});

module.exports = Space;
