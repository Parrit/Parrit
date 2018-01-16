import React from 'react'
import PropTypes from 'prop-types'
import exact from 'prop-types-exact'

import Person from './Person.js'

class PersonList extends React.Component {
    render() {
        return (
            <div className="person-list">
                {this.props.people.map((person, idx) => {
                    return <Person
                                key={idx}
                                id={person.id}
                                name={person.name}
                            />
                })}
            </div>
        )
    }
}

PersonList.propTypes = exact({
    people: PropTypes.arrayOf(PropTypes.object).isRequired,
})

export default PersonList
