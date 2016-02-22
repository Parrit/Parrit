var React = require('react');
var Person = require('workspace/components/Person.js');

var PersonList = React.createClass({
    propTypes: {
        index: React.PropTypes.number.isRequired,
        people: React.PropTypes.arrayOf(React.PropTypes.object).isRequired
    },

    render: function() {
        var spaceIndex = this.props.index;
        return <div className="personList">
            {this.props.people.map(function (person, idx) {
                return <Person key={idx} name={person.name} index={idx} spaceIndex={spaceIndex}/>
            })}
        </div>
    }
});

module.exports = PersonList;
