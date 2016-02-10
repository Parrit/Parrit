var React = require('react');
var PersonContainer = require('containers/personContainer.js');

var PersonList = React.createClass({
    propTypes: {
        index: React.PropTypes.number.isRequired,
        people: React.PropTypes.arrayOf(React.PropTypes.object).isRequired
    },

    render: function() {
        var spaceIndex = this.props.index;
        return <span>
            {this.props.people.map(function (person, idx) {
                return <PersonContainer key={idx} name={person.name} index={idx} spaceIndex={spaceIndex}/>
            })}
        </span>
    }
});

module.exports = PersonList;
