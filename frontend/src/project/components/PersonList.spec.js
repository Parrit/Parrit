import React from 'react'
import { shallow } from 'enzyme'

import PersonList from './PersonList.js'
import Person from './Person.js'

describe('<PersonList/>', () => {
    it('renders all of the people', () => {
        const props = {
            people: [
                {
                    id: 7,
                    name: 'George'
                },
                {
                    id: 88,
                    name: 'Hank Muchacho'
                }
            ]
        }

        const wrapper = shallow(<PersonList {...props} />)

        const people = wrapper.find(Person)
        expect(people.length).toBe(2)

        expect(people.at(0).prop('id')).toBe(7)
        expect(people.at(0).prop('name')).toBe('George')

        expect(people.at(1).prop('id')).toBe(88)
        expect(people.at(1).prop('name')).toBe('Hank Muchacho')
    })

    it('can render two people with the same name', () => {
        const props = {
            people: [
                {
                    id: 7,
                    name: 'Hank Muchacho'
                },
                {
                    id: 88,
                    name: 'Hank Muchacho'
                }
            ]
        }

        const wrapper = shallow(<PersonList {...props} />)

        const people = wrapper.find(Person)
        expect(people.length).toBe(2)

        expect(people.at(0).prop('id')).toBe(7)
        expect(people.at(0).prop('name')).toBe('Hank Muchacho')

        expect(people.at(1).prop('id')).toBe(88)
        expect(people.at(1).prop('name')).toBe('Hank Muchacho')
    })
})
