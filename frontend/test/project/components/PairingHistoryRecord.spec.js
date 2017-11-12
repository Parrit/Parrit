import React from 'react';
import { shallow } from 'enzyme';
import timezoneMock from 'timezone-mock'

import PairingHistoryRecord from 'project/components/PairingHistoryRecord.js';

describe('<PairingHistoryRecord/>', () => {
    let wrapper, props;

    beforeAll(() => {
        timezoneMock.register('US/Pacific')
    })

    afterAll(() => {
        timezoneMock.unregister()
    })

    beforeEach(() => {
        props = {
            pairingTime: '2016-03-08T17:30:00.000+0000',
            pairingBoardsWithPeople: [
                {pairingBoardName: 'board1', people: [{name: 'Bob'}, {name: 'Billy'}]},
                {pairingBoardName: 'board2', people: [{name: 'Alice'}]}
            ]
        };

        wrapper = shallow(<PairingHistoryRecord {...props}/>);
    });

    it('displays the pairing time in the local timezone', () => {
        expect(wrapper.find('.pairing-time').text()).toBe('March 8, 2016 5:30 PM');
    });

    it('displays the pairing boards with the people', () => {
        const pairingBoardNames = wrapper.find('.pairing-board-name');
        expect(pairingBoardNames.at(0).text()).toContain('board1');
        expect(pairingBoardNames.at(1).text()).toContain('board2');

        const peopleNames = wrapper.find('.person-name');
        expect(peopleNames.at(0).text()).toContain('Bob');
        expect(peopleNames.at(1).text()).toContain('Billy');
        expect(peopleNames.at(2).text()).toContain('Alice');
    });
});
