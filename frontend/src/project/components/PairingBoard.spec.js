import React from 'react';
import { shallow } from 'enzyme';

import PairingBoard from './PairingBoard.js';

describe('<PairingBoard/>', () => {
    let wrapper, props;
    const InnerPairingBoard = PairingBoard.DecoratedComponent;

    beforeEach(() => {
        props  = {
            id: 77,
            name: "PairingBoard1",
            people: [
                { name: "George" },
                { name: "Hank Muchacho" }
            ],
            exempt: false,
            editErrorMessage: 'some error message',
            isOver: true,
            renamePairingBoard: jasmine.createSpy('renamePairingBoardSpy'),
            deletePairingBoard: jasmine.createSpy('deletePairingBoardSpy'),
            movePerson: jasmine.createSpy('movePersonSpy'),
            connectDropTarget: jasmine.createSpy('connectDropTargetSpy')
        };

        props.connectDropTarget.and.callFake(i => i);

        wrapper = shallow(<InnerPairingBoard {...props} />);
    });

    it('renders the list of people', () => {
        const people = wrapper.find('PersonList');
        expect(people.prop('people')).toBe(props.people);
    });

    it('renders a rename button', () => {
        expect(wrapper.find('.rename-pairing-board').exists()).toBeTruthy();
    });

    it('renders a delete button', () => {
        expect(wrapper.find('.delete-pairing-board').exists()).toBeTruthy();
    });

    it('adds the drop-targer class when isOver is true', () => {
        expect(wrapper.prop('className')).toContain('drop-target');
    })

    describe('#exempt', () => {
        beforeEach(() => {
            props.exempt = true;
            wrapper = shallow(<InnerPairingBoard {...props} />);
        });

        it('renders an exempt header', () => {
            const exemptHeader = wrapper.find('.pairing-board exempt');
            expect(exemptHeader).toBeTruthy();
        });

        it('does not render a delete button', () => {
            expect(wrapper.find('.delete-pairing-board').length).toEqual(0);
        });
    });

    describe('#editErrorMessage', () => {
        it('displays the error message when there is an error message and in edit mode', () => {
            wrapper.setState({editMode: true})
            expect(wrapper.find('.error-message').text()).toEqual('some error message');
            expect(wrapper.find('.editing-pairing-board-name').prop('className')).toContain('error');
        });
    });

    describe('#renamePairingBoard', () => {
        it('calls the renamePairingBoard prop function with the pairing board id and event target value', () => {
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

    describe('#deletePairingBoard', () => {
        it('calls the deletePairingBoard prop function with the pairing board id', () => {
            wrapper.find('.delete-pairing-board').simulate('click');
            expect(props.deletePairingBoard).toHaveBeenCalledWith(77);
        })
    });
});