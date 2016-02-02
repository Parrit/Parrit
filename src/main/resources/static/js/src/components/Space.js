var React = require('react');
var PersonContainer = require('../containers/personContainer.js');

var Space = React.createClass({
	render: function() {
		return <div className="dropzone well">{this.props.name}
			{this.props.people.map(function (person) {
				return <PersonContainer name={person.name}/>
			})}
		</div>
	}
});

module.exports = Space;
