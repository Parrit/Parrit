const React = require('react');
const PropTypes = require('prop-types');
const Person = require('project/components/Person.js');

class PersonList extends React.Component {
    render() {
        const pairingBoardIndex = this.props.index;

        return <div className="person-list">
            {this.props.people.map(function (person, idx) {
                return <Person key={idx} name={person.name} index={idx} pairingBoardIndex={pairingBoardIndex}/>
            })}
        </div>
    }
}

PersonList.propTypes = {
    index: PropTypes.number.isRequired,
    people: PropTypes.arrayOf(PropTypes.object).isRequired
};

module.exports = PersonList;
