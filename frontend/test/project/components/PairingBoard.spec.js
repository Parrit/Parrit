import React from 'react';
import { shallow } from 'enzyme';

import PairingBoard from 'project/components/PairingBoard.js';

describe('<PairingBoard/>', () => {
    let wrapper, props;

    beforeEach(() => {
        props  = {
            index: 1,
            pairingBoard: {
                id: 77,
                name: "PairingBoard1",
                people: [
                    {
                        name: "George"
                    },
                    {
                        name: "Hank Muchacho"
                    }
                ],
                exempt: false,
            },
            deletePairingBoard: jasmine.createSpy('deletePairingBoardSpy'),
            renamePairingBoard: jasmine.createSpy('renamePairingBoardSpy')
        };

        wrapper = shallow(<PairingBoard {...props} />);
    });

    it('renders the pairingBoard element with an id relative to index', () => {
        expect(wrapper.prop('id')).toBe("pairing_board_1", "No correct id");
    });

    it('renders the list of people', () => {
        const people = wrapper.find('PersonList');
        expect(people.prop('index')).toBe(props.index);
        expect(people.prop('people')).toBe(props.pairingBoard.people);
    });

    it('renders a rename button', () => {
        expect(wrapper.find('.rename-pairing-board').exists()).toBeTruthy();
    });

    it('renders a delete button', () => {
        expect(wrapper.find('.delete-pairing-board').exists()).toBeTruthy();
    });

    describe('#deletePairingBoard', () => {
        it('calls the deletePairingBoard prop function with the index prop', () => {
            wrapper.find('.delete-pairing-board').simulate('click');
            expect(props.deletePairingBoard).toHaveBeenCalledWith(1);
        })
    });

    describe('#renamePairingBoard', () => {
        it('calls the renamePairingBoard prop function with the pairingBoard id and event target value', () => {
            const event = {target: {value: 'Cheese'}};
            wrapper.setState({editMode: true})
            wrapper.find('.editing-pairing-board-name').simulate('blur', event);

            expect(props.renamePairingBoard).toHaveBeenCalledWith(77, 'Cheese', jasmine.anything());
        });

        it('disable edit mode if renaming the pairing board succeeds', () => {
            const event = {target: {value: 'Cheese'}};
            wrapper.setState({editMode: true})
            wrapper.find('.editing-pairing-board-name').simulate('blur', event);

            const successCallback = props.renamePairingBoard.calls.mostRecent().args[2];
            successCallback();

            expect(wrapper.state('editMode')).toBe(false)
        })
    });

    describe('#exempt', () => {
        beforeEach(() => {
            props.pairingBoard.exempt = true;
            wrapper = shallow(<PairingBoard {...props} />);
        });

        it('renders an exempt header', () => {
            const exemptHeader = wrapper.find('.pairing-board exempt');
            expect(exemptHeader).toBeTruthy();
        });

        it('does not render a delete button', () => {
            expect(wrapper.find('.delete-pairing-board').length).toEqual(0);
        });
    });
});