const React = require('react');
const ReactTestUtils = require('react-dom/test-utils');

const RenderComponent = require('support/RenderComponent.js');
const Mocker = require('support/ComponentMocker.js');

const Workspace = require('project/components/Workspace.js');
const PairingBoardMock = Mocker("PairingBoard");
const PersonListMock = Mocker("PersonList");
const ModalMock = Mocker("Modal");
const NameFormMock = Mocker("NameForm");
Workspace.__set__('PairingBoard', PairingBoardMock);
Workspace.__set__('PersonList', PersonListMock);
Workspace.__set__('Modal', ModalMock);
Workspace.__set__('NameForm', NameFormMock);

describe('Workspace', function() {
    let props;
    let workspace;
    let newPersonModal;
    let newPersonForm;
    let newPairingBoardModal;
    let newPairingBoardForm;

    beforeEach(function() {
        props  = {
            projectId: 77,
            settings: {
                isNewPersonModalOpen: false,
                isNewPairingBoardModalOpen: true,
                errorType: 406
            },
            people: [
                {name:"Mike Wazowski"},
                {name:"Sully"}
            ],
            pairingBoards: [
                {
                    name: "PairingBoard1",
                    people: [
                        {
                            name: "George"
                        }
                    ]
                },
                {
                    name: "Ghost",
                    people: [
                        {
                            name: "Coast2Coast"
                        }
                    ]
                }
            ],

            createPerson: jasmine.createSpy('createPersonSpy'),
            createPairingBoard: jasmine.createSpy('createPairingBoardSpy'),
            setNewPersonModalOpen: jasmine.createSpy('setNewPersonModalOpenSpy'),
            setNewPairingBoardModalOpen: jasmine.createSpy('setNewPairingBoardModalOpenSpy'),
            setErrorType: jasmine.createSpy('setErrorTypeSpy'),

            deletePairingBoard: function(){},
            renamePairingBoard: function(){}
        };

        spyOn(Workspace.prototype, 'closeNewPersonModal').and.callThrough();
        spyOn(Workspace.prototype, 'createPersonWithName').and.callThrough();
        spyOn(Workspace.prototype, 'closeNewPairingBoardModal').and.callThrough();
        spyOn(Workspace.prototype, 'createPairingBoardWithName').and.callThrough();

        workspace = RenderComponent(Workspace, <Workspace {...props} />);

        const Modals = ReactTestUtils.scryRenderedComponentsWithType(workspace, ModalMock);
        newPersonModal = Modals[0];
        newPairingBoardModal = Modals[1];

        newPersonForm = ReactTestUtils.findRenderedComponentWithType(newPersonModal, NameFormMock);
        newPairingBoardForm = ReactTestUtils.findRenderedComponentWithType(newPairingBoardModal, NameFormMock);
    });

    it('renders all of the pairingBoards in the project', function() {
        const pairingBoards = ReactTestUtils.scryRenderedComponentsWithType(workspace, PairingBoardMock);
        expect(pairingBoards.length).toBe(2, 'Not enough pairingBoards');

        expect(pairingBoards[0].props.name).toBe("PairingBoard1");
        expect(pairingBoards[0].props.people).toEqual([{name:"George"}]);
        expect(pairingBoards[0].props.index).toBe(0);
        expect(pairingBoards[0].props.deletePairingBoard).toBe(props.deletePairingBoard);
        expect(pairingBoards[0].props.renamePairingBoard).toBe(props.renamePairingBoard);

        expect(pairingBoards[1].props.name).toBe("Ghost");
        expect(pairingBoards[1].props.people).toEqual([{name:"Coast2Coast"}]);
        expect(pairingBoards[1].props.index).toBe(1);
        expect(pairingBoards[1].props.deletePairingBoard).toBe(props.deletePairingBoard);
        expect(pairingBoards[1].props.renamePairingBoard).toBe(props.renamePairingBoard);
    });

    it('renders the list of people in the project', function() {
        const people = ReactTestUtils.findRenderedComponentWithType(workspace, PersonListMock);
        expect(people).toBeDefined('No list of people');
        expect(people.props.people).toBe(props.people);
        expect(people.props.index).toBe(-1);
    });

    describe('newPersonModal', function() {
        it('has a configured newPersonModal component as a child', function() {
            expect(newPersonModal.props.isOpen).toBe(props.settings.isNewPersonModalOpen);
            newPersonModal.props.onRequestClose();

            expect(workspace.closeNewPersonModal).toHaveBeenCalled();
        });

        it('has a configured new person form in a modal', function() {
            expect(newPersonForm.props.formTitle).toBe("Add Parrit Teammate");

            newPersonForm.props.confirmFunction();
            expect(workspace.createPersonWithName).toHaveBeenCalled();

            newPersonForm.props.cancelFunction();
            expect(workspace.closeNewPersonModal).toHaveBeenCalled();
        });

        it('passes in the correct error message if errorType is set', function() {
            expect(newPersonForm.props.errorMessage).toBe('Hey! This name is too long... 100 characters max.');
        });

        describe('#openNewPersonModal', function() {
            it('shows the modal', function() {
                workspace.openNewPersonModal();
                expect(props.setNewPersonModalOpen).toHaveBeenCalledWith(true);
            });
        });

        describe('#createPersonWithName', function() {
            beforeEach(function() {
                workspace.createPersonWithName('Luke Skywalker');
            });

            it('should call the createPerson action with the projectId, the passed in name and a callback', function() {
                expect(props.createPerson).toHaveBeenCalledWith(77, 'Luke Skywalker', jasmine.anything());
            });

            it('the passed in callback should close the modal and clear the errorType', function() {
                const callback = props.createPerson.calls.mostRecent().args[2];
                callback();

                expect(props.setNewPersonModalOpen).toHaveBeenCalledWith(false);
                expect(props.setErrorType).toHaveBeenCalledWith(0);
            });
        });
    });

    describe('newPairingBoardModal', function() {
        it('has a configured newPairingBoardModal component as a child', function() {
            expect(newPairingBoardModal.props.isOpen).toBe(props.settings.isNewPairingBoardModalOpen);
            newPairingBoardModal.props.onRequestClose();

            expect(workspace.closeNewPairingBoardModal).toHaveBeenCalled();
        });

        it('has a configured new pairing boards form in a modal', function() {
            expect(newPairingBoardForm.props.formTitle).toBe("Add Pairing Board");

            newPairingBoardForm.props.confirmFunction();
            expect(workspace.createPairingBoardWithName).toHaveBeenCalled();

            newPairingBoardForm.props.cancelFunction();
            expect(workspace.closeNewPairingBoardModal).toHaveBeenCalled();
        });

        describe('#openNewPairingBoardModal', function() {
            it('shows the modal', function() {
                workspace.openNewPairingBoardModal();
                expect(props.setNewPairingBoardModalOpen).toHaveBeenCalledWith(true);
            });
        });

        describe('#createPairingBoardWithName', function() {
            it('should call the createPairingBoard action with the passed in name', function() {
                workspace.createPairingBoardWithName('Luke Skywalker');
                expect(props.createPairingBoard).toHaveBeenCalledWith('Luke Skywalker');
            });

            it('should close the modal', function() {
                workspace.createPairingBoardWithName('Luke Skywalker');
                expect(props.setNewPairingBoardModalOpen).toHaveBeenCalledWith(false);
            });
        });
    });
});