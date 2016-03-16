var React = require('react');
var Person = require('project/components/Person.js');

var PersonList = React.createClass({
    propTypes: {
        index: React.PropTypes.number.isRequired,
        people: React.PropTypes.arrayOf(React.PropTypes.object).isRequired
    },

    render: function() {
        var pairingBoardIndex = this.props.index;
        return <div className="person-list">
            {this.props.people.map(function (person, idx) {
                return <Person key={idx} name={person.name} index={idx} pairingBoardIndex={pairingBoardIndex}/>
            })}
        </div>
    }
});

module.exports = PersonList;
