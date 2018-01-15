import React from 'react';
import { shallow } from 'enzyme';

import Workspace from './Workspace.js';
import PersonTrashBin from './PersonTrashBin.js'
import PairingBoard from './PairingBoard.js'

describe('<Workspace/>', () => {
    let wrapper, props;
    let newPersonModal, newPersonForm;
    let newPairingBoardModal, newPairingBoardForm;

    beforeEach(() => {
        props  = {
            projectId: 77,
            people: [
                { name: "Mike Wazowski" },
                { name: "Sully" }
            ],
            pairingBoards: [
                {
                    id: 56,
                    name: "PairingBoard1",
                    people: [
                        { name: "George" }
                    ],
                    exempt: true
                },
                {
                    id: 89,
                    name: "Ghost",
                    people: [
                        { name: "Coast2Coast" }
                    ],
                    exempt: false
                }
            ],
            settings: {
                modal: {
                    isNewPersonModalOpen: false,
                    isNewPairingBoardModalOpen: true,
                    newPersonModalErrorMessage: "some error message",
                    newPairingBoardModalErrorMessage: "some error message"
                },
                pairingBoardErrors: {
                    89: 'some edit error message'
                }
            },
            createPerson: jasmine.createSpy('createPersonSpy'),
            movePerson: () => {},
            deletePerson: () => {},
            createPairingBoard: jasmine.createSpy('createPairingBoardSpy'),
            renamePairingBoard: () => {},
            deletePairingBoard: () => {},
            setNewPersonModalOpen: jasmine.createSpy('setNewPersonModalOpenSpy'),
            setNewPairingBoardModalOpen: jasmine.createSpy('setNewPairingBoardModalOpenSpy')
        };

        wrapper = shallow(<Workspace {...props} />);

        const Modals = wrapper.find('Modal');
        newPersonModal = Modals.at(0);
        newPairingBoardModal = Modals.at(1);

        newPersonForm = newPersonModal.find('NameForm');
        newPairingBoardForm = newPairingBoardModal.find('NameForm');
    });

    it('renders the list of people in the project', () => {
        const people = wrapper.find('PersonList');
        expect(people.prop('people')).toBe(props.people);
    });

    it('render the person trash bin', () => {
        const personTrashBin = wrapper.find(PersonTrashBin);
        expect(personTrashBin.prop('deletePerson')).toBe(props.deletePerson);
    });

    it('renders all of the pairingBoards in the project', () => {
        const pairingBoards = wrapper.find(PairingBoard);
        expect(pairingBoards.length).toBe(2);

        expect(pairingBoards.at(0).prop('pairingBoard')).toBe(props.pairingBoards[0]);
        expect(pairingBoards.at(0).prop('editErrorMessage')).toBe(props.settings.pairingBoardErrors[56]);
        expect(pairingBoards.at(0).prop('renamePairingBoard')).toBe(props.renamePairingBoard);
        expect(pairingBoards.at(0).prop('deletePairingBoard')).toBe(props.deletePairingBoard);
        expect(pairingBoards.at(0).prop('movePerson')).toBe(props.movePerson);

        expect(pairingBoards.at(1).prop('pairingBoard')).toBe(props.pairingBoards[1]);
        expect(pairingBoards.at(1).prop('editErrorMessage')).toBe(props.settings.pairingBoardErrors[89]);
        expect(pairingBoards.at(1).prop('renamePairingBoard')).toBe(props.renamePairingBoard);
        expect(pairingBoards.at(1).prop('deletePairingBoard')).toBe(props.deletePairingBoard);
        expect(pairingBoards.at(1).prop('movePerson')).toBe(props.movePerson);
    });

    describe('newPersonModal', () => {
        it('has a configured newPersonModal component as a child', () => {
            expect(newPersonModal.prop('isOpen')).toBe(props.settings.modal.isNewPersonModalOpen);
        });

        it('has a configured new person form in a modal', () => {
            expect(newPersonForm.prop('formTitle')).toBe("Add Parrit Teammate");
        });

        it('passes in the error message', () => {
            expect(newPersonForm.prop('errorMessage')).toBe("some error message");
        });

        describe('#openNewPersonModal', () => {
            it('shows the modal', () => {
                wrapper.find('.add-parrit-button').simulate('click');
                expect(props.setNewPersonModalOpen).toHaveBeenCalledWith(true);
            });
        });

        describe('#createPersonWithName', () => {
            beforeEach(() => {
                newPersonForm.prop('confirmFunction')('Luke Skywalker');
            });

            it('should call the createPerson action with the projectId, the passed in name and a callback', () => {
                expect(props.createPerson).toHaveBeenCalledWith(77, 'Luke Skywalker', jasmine.anything());
            });

            it('the passed in callback should close the modal', () => {
                const callback = props.createPerson.calls.mostRecent().args[2];
                callback();

                expect(props.setNewPersonModalOpen).toHaveBeenCalledWith(false);
            });
        });
    });

    describe('newPairingBoardModal', () => {
        it('has a configured newPairingBoardModal component as a child', () => {
            expect(newPairingBoardModal.prop('isOpen')).toBe(props.settings.modal.isNewPairingBoardModalOpen);
        });

        it('has a configured new pairing boards form in a modal', () => {
            expect(newPairingBoardForm.prop('formTitle')).toBe("Add Pairing Board");
        });

        it('passes in the error message', () => {
            expect(newPairingBoardForm.prop('errorMessage')).toBe("some error message");
        });

        describe('#openNewPairingBoardModal', () => {
            it('shows the modal', () => {
                wrapper.find('.add-board-button').simulate('click');
                expect(props.setNewPairingBoardModalOpen).toHaveBeenCalledWith(true);
            });
        });

        describe('#createPairingBoardWithName', () => {
            beforeEach(() => {
                newPairingBoardForm.prop('confirmFunction')('Luke Skywalker');
            });

            it('should call the createPairingBoard action with the passed in name', () => {
                expect(props.createPairingBoard).toHaveBeenCalledWith(77, 'Luke Skywalker', jasmine.anything());
            });

            it('the passed in callback should close the modal', () => {
                const callback = props.createPairingBoard.calls.mostRecent().args[2];
                callback();

                expect(props.setNewPairingBoardModalOpen).toHaveBeenCalledWith(false);
            });
        });
    });
});