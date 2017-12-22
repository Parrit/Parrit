import React from 'react';
import { shallow } from 'enzyme';

import PersonList from './PersonList.js';

describe('<PersonList/>', () => {
    it('renders all of the people', () => {
        const props = {
            people: [
                {
                    name: "George"
                },
                {
                    name: "Hank Muchacho"
                }
            ],
            index: 1
        };

        const wrapper = shallow(<PersonList {...props} />);

        const people = wrapper.find('Person');
        expect(people.length).toBe(2, 'Not enough people');

        expect(people.at(0).prop('name')).toBe("George");
        expect(people.at(0).prop('index')).toBe(0);
        expect(people.at(0).prop('pairingBoardIndex')).toBe(1);

        expect(people.at(1).prop('name')).toBe("Hank Muchacho");
        expect(people.at(1).prop('index')).toBe(1);
        expect(people.at(1).prop('pairingBoardIndex')).toBe(1);
    });

    it('can render two people with the same name', () => {
        const props = {
            people: [
                {
                    name: "Hank Muchacho"
                },
                {
                    name: "Hank Muchacho"
                }
            ],
            index: 1
        };

        const wrapper = shallow(<PersonList {...props} />);

        const people = wrapper.find('Person');
        expect(people.length).toBe(2, 'Not enough people');

        expect(people.at(0).prop('name')).toBe("Hank Muchacho");
        expect(people.at(0).prop('index')).toBe(0);
        expect(people.at(0).prop('pairingBoardIndex')).toBe(1);

        expect(people.at(1).prop('name')).toBe("Hank Muchacho");
        expect(people.at(1).prop('index')).toBe(1);
        expect(people.at(1).prop('pairingBoardIndex')).toBe(1);
    });
});
