var React = require('react');
var ReactTestUtils = require('react-addons-test-utils');

var RenderComponent = require('support/RenderComponent.js');
var Mocker = require('support/ComponentMocker.js');

var Workspace = require('project/components/Workspace.js');
var PairingBoardMock = Mocker("PairingBoard");
var PersonListMock = Mocker("PersonList");
var ModalMock = Mocker("Modal");
var NameFormMock = Mocker("NameForm");
Workspace.__set__('PairingBoard', PairingBoardMock);
Workspace.__set__('PersonList', PersonListMock);
Workspace.__set__('Modal', ModalMock);
Workspace.__set__('NameForm', NameFormMock);

describe('Workspace', function() {
    var props;
    var workspace;
    var newPersonModal;
    var newPersonForm;
    var newPairingBoardModal;
    var newPairingBoardForm;
    beforeEach(function() {
        props  = {
            settings: {
                isNewPersonModalOpen: false
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

            deletePairingBoard: function(){},
            renamePairingBoard: function(){}
        };

        workspace = RenderComponent(Workspace, <Workspace {...props} />);

        var Modals = ReactTestUtils.scryRenderedComponentsWithType(workspace, ModalMock);
        newPersonModal = Modals[0];
        newPairingBoardModal = Modals[1];

        newPersonForm = ReactTestUtils.findRenderedComponentWithType(newPersonModal, NameFormMock);
        newPairingBoardForm = ReactTestUtils.findRenderedComponentWithType(newPairingBoardModal, NameFormMock);
    });

    it('renders all of the pairingBoards in the project', function() {
        var pairingBoards = ReactTestUtils.scryRenderedComponentsWithType(workspace, PairingBoardMock);
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
        var people = ReactTestUtils.findRenderedComponentWithType(workspace, PersonListMock);
        expect(people).toBeDefined('No list of people');
        expect(people.props.people).toBe(props.people);
        expect(people.props.index).toBe(-1);
    });

    describe('newPersonModal', function() {
        it('has a configured newPersonModal component as a child', function() {
            expect(newPersonModal.props.onRequestClose).toBe(workspace.closeNewPersonModal);
        });

        it('has a configured new person form in a modal', function() {
            expect(newPersonForm.props.formTitle).toBe("Add Parrit Teammate");
            expect(newPersonForm.props.confirmFunction).toBe(workspace.createPersonWithName);
            expect(newPersonForm.props.cancelFunction).toBe(workspace.closeNewPersonModal);
        });

        describe('#openNewPersonModal', function() {
            it('shows the modal', function() {
                workspace.openNewPersonModal();
                expect(props.setNewPersonModalOpen).toHaveBeenCalledWith(true);
            });
        });

        describe('#createPersonWithName', function() {
            it('should call the createPerson action with the passed in name', function() {
                workspace.createPersonWithName('Luke Skywalker');
                expect(props.createPerson).toHaveBeenCalledWith('Luke Skywalker');
            });

            it('should close the modal', function() {
                workspace.createPersonWithName('Luke Skywalker');
                expect(props.setNewPersonModalOpen).toHaveBeenCalledWith(false);
            });
        });
    });

    describe('newPairingBoardModal', function() {
        it('has a configured newPairingBoardModal component as a child', function() {
            expect(newPairingBoardModal.props.onRequestClose).toBe(workspace.closeNewPairingBoardModal);
        });

        it('has a configured new pairing boards form in a modal', function() {
            expect(newPairingBoardForm.props.formTitle).toBe("Add Pairing Board");
            expect(newPairingBoardForm.props.confirmFunction).toBe(workspace.createPairingBoardWithName);
            expect(newPairingBoardForm.props.cancelFunction).toBe(workspace.closeNewPairingBoardModal);
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