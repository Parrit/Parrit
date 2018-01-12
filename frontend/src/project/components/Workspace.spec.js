import React from 'react';
import { shallow } from 'enzyme';

import Workspace from './Workspace.js';

describe('<Workspace/>', () => {
    let wrapper, props;
    let newPersonModal, newPersonForm;
    let newRoleModal, newRoleForm;
    let newPairingBoardModal, newPairingBoardForm;

    beforeEach(() => {
        props  = {
            projectId: 77,
            settings: {
                modal: {
                    isNewPersonModalOpen: false,
                    isNewRoleModalOpen: false,
                    isNewPairingBoardModalOpen: true,
                    newPersonModalErrorMessage: "some error message",
                    newRoleModalErrorMessage: "some error message",
                    newPairingBoardModalErrorMessage: "some error message",
                    newRoleModalPairingBoardId: 17
                },
                pairingBoardErrors: {
                    89: 'some edit error message'
                }
            },
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

            createPerson: jasmine.createSpy('createPersonSpy'),
            createRole: jasmine.createSpy('createRoleSpy'),
            createPairingBoard: jasmine.createSpy('createPairingBoardSpy'),
            setNewPersonModalOpen: jasmine.createSpy('setNewPersonModalOpenSpy'),
            setNewRoleModalOpen: jasmine.createSpy('setNewRoleModalOpenSpy'),
            setNewPairingBoardModalOpen: jasmine.createSpy('setNewPairingBoardModalOpenSpy'),

            deletePairingBoard: () => {},
            renamePairingBoard: () => {}
        };

        wrapper = shallow(<Workspace {...props} />);

        const Modals = wrapper.find('Modal');
        newPersonModal = Modals.at(0);
        newRoleModal = Modals.at(1);
        newPairingBoardModal = Modals.at(2);

        newPersonForm = newPersonModal.find('NameForm');
        newRoleForm = newRoleModal.find('NameForm');
        newPairingBoardForm = newPairingBoardModal.find('NameForm');
    });

    it('renders all of the pairingBoards in the project', () => {
        const pairingBoards = wrapper.find('PairingBoard');
        expect(pairingBoards.length).toBe(2, 'Not enough pairingBoards');

        expect(pairingBoards.at(0).prop('index')).toBe(0);
        expect(pairingBoards.at(0).prop('pairingBoard')).toBe(props.pairingBoards[0]);
        expect(pairingBoards.at(0).prop('editErrorMessage')).toBe(props.settings.pairingBoardErrors[56]);
        expect(pairingBoards.at(0).prop('deletePairingBoard')).toBe(props.deletePairingBoard);
        expect(pairingBoards.at(0).prop('renamePairingBoard')).toBe(props.renamePairingBoard);

        expect(pairingBoards.at(1).prop('index')).toBe(1);
        expect(pairingBoards.at(1).prop('pairingBoard')).toBe(props.pairingBoards[1]);
        expect(pairingBoards.at(1).prop('editErrorMessage')).toBe(props.settings.pairingBoardErrors[89]);
        expect(pairingBoards.at(1).prop('deletePairingBoard')).toBe(props.deletePairingBoard);
        expect(pairingBoards.at(1).prop('renamePairingBoard')).toBe(props.renamePairingBoard);
    });

    it('renders the list of people in the project', () => {
        const people = wrapper.find('PersonList');
        expect(people.exists()).toBeTruthy();
        expect(people.prop('people')).toBe(props.people);
        expect(people.prop('index')).toBe(-1);
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

    describe('newRoleModal', () => {
        it('has a configured newRoleModal component as a child', () => {
            expect(newRoleModal.prop('isOpen')).toBe(props.settings.modal.isNewRoleModalOpen);
        });

        it('has a configured new role form in a modal', () => {
            expect(newRoleForm.prop('formTitle')).toBe("Add Parrit Role");
        });

        it('passes in the error message', () => {
            expect(newRoleForm.prop('errorMessage')).toBe("some error message");
        });

        describe('#createRoleWithName', () => {
            beforeEach(() => {
                newRoleForm.prop('confirmFunction')('Luke Skywalker');
            });

            it('should call the createRole action with the projectId, the passed in name and a callback', () => {
                expect(props.createRole).toHaveBeenCalledWith(77, 'Luke Skywalker', 17, jasmine.anything());
            });

            it('the passed in callback should close the modal', () => {
                const callback = props.createRole.calls.mostRecent().args[3];
                callback();

                expect(props.setNewRoleModalOpen).toHaveBeenCalledWith(false);
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
