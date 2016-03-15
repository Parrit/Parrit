var React = require('react');
var ReactTestUtils = require('react-addons-test-utils');

var RenderComponent = require('support/RenderComponent.js');
var Mocker = require('support/ComponentMocker.js');

var Workspace = require('workspace/components/Workspace.js');
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
    var newSpaceModal;
    var newSpaceForm;
    beforeEach(function() {
        props  = {
            settings: {
                isNewPersonModalOpen: false
            },
            people: [
                {name:"Mike Wazowski"},
                {name:"Sully"}
            ],
            spaces: [
                {
                    name: "Space1",
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
            createSpace: jasmine.createSpy('createSpaceSpy'),
            setNewPersonModalOpen: jasmine.createSpy('setNewPersonModalOpenSpy'),
            setNewSpaceModalOpen: jasmine.createSpy('setNewSpaceModalOpenSpy'),

            deleteSpace: function(){},
            renameSpace: function(){}
        };

        workspace = RenderComponent(Workspace, <Workspace {...props} />);

        var Modals = ReactTestUtils.scryRenderedComponentsWithType(workspace, ModalMock);
        newPersonModal = Modals[0];
        newSpaceModal = Modals[1];

        newPersonForm = ReactTestUtils.findRenderedComponentWithType(newPersonModal, NameFormMock);
        newSpaceForm = ReactTestUtils.findRenderedComponentWithType(newSpaceModal, NameFormMock);
    });

    it('renders all of the spaces in the workspace', function() {
        var spaces = ReactTestUtils.scryRenderedComponentsWithType(workspace, PairingBoardMock);
        expect(spaces.length).toBe(2, 'Not enough spaces');

        expect(spaces[0].props.name).toBe("Space1");
        expect(spaces[0].props.people).toEqual([{name:"George"}]);
        expect(spaces[0].props.index).toBe(0);
        expect(spaces[0].props.deleteSpace).toBe(props.deleteSpace);
        expect(spaces[0].props.renameSpace).toBe(props.renameSpace);

        expect(spaces[1].props.name).toBe("Ghost");
        expect(spaces[1].props.people).toEqual([{name:"Coast2Coast"}]);
        expect(spaces[1].props.index).toBe(1);
        expect(spaces[1].props.deleteSpace).toBe(props.deleteSpace);
        expect(spaces[1].props.renameSpace).toBe(props.renameSpace);
    });

    it('renders the list of people in the workspace', function() {
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

    describe('newSpaceModal', function() {
        it('has a configured newSpaceModal component as a child', function() {
            expect(newSpaceModal.props.onRequestClose).toBe(workspace.closeNewSpaceModal);
        });

        it('has a configured new space form in a modal', function() {
            expect(newSpaceForm.props.formTitle).toBe("Add Pairing Board");
            expect(newSpaceForm.props.confirmFunction).toBe(workspace.createSpaceWithName);
            expect(newSpaceForm.props.cancelFunction).toBe(workspace.closeNewSpaceModal);
        });

        describe('#openNewSpaceModal', function() {
            it('shows the modal', function() {
                workspace.openNewSpaceModal();
                expect(props.setNewSpaceModalOpen).toHaveBeenCalledWith(true);
            });
        });

        describe('#createSpaceWithName', function() {
            it('should call the createSpace action with the passed in name', function() {
                workspace.createSpaceWithName('Luke Skywalker');
                expect(props.createSpace).toHaveBeenCalledWith('Luke Skywalker');
            });

            it('should close the modal', function() {
                workspace.createSpaceWithName('Luke Skywalker');
                expect(props.setNewSpaceModalOpen).toHaveBeenCalledWith(false);
            });
        });
    });
});