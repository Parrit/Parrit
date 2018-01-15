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
            isOver: false,
            renamePairingBoard: jasmine.createSpy('renamePairingBoardSpy'),
            deletePairingBoard: jasmine.createSpy('deletePairingBoardSpy'),
            movePerson: jasmine.createSpy('movePersonSpy'),
            connectDropTarget: jasmine.createSpy('connectDropTargetSpy')
        };

        props.connectDropTarget.and.callFake(i => i);

        wrapper = shallow(<InnerPairingBoard {...props} />);
    });

    it('renders the pairing board with only the pairing board class', () => {
        expect(wrapper.prop('className')).toBe('pairing-board');
    });

    it('renders the pairing board header', () => {
        const pairingBoardHeader = wrapper.find('PairingBoardHeader');
        expect(pairingBoardHeader.prop('name')).toBe("PairingBoard1");
        expect(pairingBoardHeader.prop('exempt')).toBe(false);
        expect(pairingBoardHeader.prop('editMode')).toBe(false);
        expect(pairingBoardHeader.prop('editErrorMessage')).toBe("some error message");
    });

    it('passes the header a rename function that calls renamePairingBoard', () => {
        const passedRenameFunction = wrapper.find('PairingBoardHeader').prop('renamePairingBoard');
        passedRenameFunction("SomeNewName");

        expect(props.renamePairingBoard).toHaveBeenCalledWith(77, "SomeNewName", jasmine.anything());

        const successCallback = props.renamePairingBoard.calls.mostRecent().args[2];
        successCallback();

        expect(wrapper.state('editMode')).toBe(false);
    });

    it('passes the header a delete function that calls deletePairingBoard', () => {
        const passedDeleteFunction = wrapper.find('PairingBoardHeader').prop('deletePairingBoard');
        passedDeleteFunction();

        expect(props.deletePairingBoard).toHaveBeenCalledWith(77);
    });

    it('passes the header a enable edit mode function that sets editMode to true', () => {
        const passedEnableEditModeFunction = wrapper.find('PairingBoardHeader').prop('enableEditMode');
        passedEnableEditModeFunction();

        expect(wrapper.state('editMode')).toBe(true);
    });

    it('renders the list of people', () => {
        const people = wrapper.find('PersonList');
        expect(people.prop('people')).toBe(props.people);
    });

    it('adds the editing class when editMode is true', () => {
        wrapper.setState({editMode: true});
        expect(wrapper.prop('className')).toContain('editing');
    })

    it('adds the exempt class when exempt is true', () => {
        props.exempt = true;
        wrapper = shallow(<InnerPairingBoard {...props} />);
        expect(wrapper.prop('className')).toContain('exempt');
    })

    it('adds the drop-target class when isOver is true', () => {
        props.isOver = true;
        wrapper = shallow(<InnerPairingBoard {...props} />);
        expect(wrapper.prop('className')).toContain('drop-target');
    })
});