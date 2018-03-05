import React from 'react'
import { shallow } from 'enzyme'

import PersonList from './PersonList.js'
import Person from './Person.js'

describe('<PersonList/>', () => {
    let wrapper, props

    beforeEach(() => {
        props = {
            people: [
                {
                    id: 7,
                    name: 'George'
                },
                {
                    id: 88,
                    name: 'Hank Muchacho'
                }
            ],
            movePerson: () => {},
            deletePerson: () => {}
        }

        wrapper = shallow(<PersonList {...props} />)
    })

    it('renders all of the people', () => {
        const people = wrapper.find(Person)
        expect(people.length).toBe(2)

        expect(people.at(0).prop('id')).toBe(7)
        expect(people.at(0).prop('name')).toBe('George')
        expect(people.at(0).prop('movePerson')).toBe(props.movePerson)
        expect(people.at(0).prop('deletePerson')).toBe(props.deletePerson)

        expect(people.at(1).prop('id')).toBe(88)
        expect(people.at(1).prop('name')).toBe('Hank Muchacho')
        expect(people.at(1).prop('movePerson')).toBe(props.movePerson)
        expect(people.at(1).prop('deletePerson')).toBe(props.deletePerson)
    })
})
