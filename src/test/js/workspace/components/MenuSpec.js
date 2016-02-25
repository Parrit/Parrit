var React = require('react');
var ReactTestUtils = require('react-addons-test-utils');

var RenderComponent = require('support/RenderComponent.js');
var Mocker = require('support/ComponentMocker.js');

var Menu = require('workspace/components/Menu.js');
var PrimaryButtonMock = Mocker("Button1");
var ModalMock = Mocker("Modal");
var NameFormMock = Mocker("NameForm");
Menu.__set__('PrimaryButton', PrimaryButtonMock);
Menu.__set__('Modal', ModalMock);
Menu.__set__('NameForm', NameFormMock);

describe('Menu', function() {
    var props;
    var menu;
    var newPersonModal;
    var newPersonForm;
    var newSpaceModal;
    var newSpaceForm;
    beforeEach(function() {
        props  = {
            settings: {
                isNewPersonModalOpen: false
            },
            createPerson: jasmine.createSpy('createPersonSpy'),
            createSpace: jasmine.createSpy('createSpaceSpy'),
            savePairing: jasmine.createSpy('savePairingSpy'),
            setNewPersonModalOpen: jasmine.createSpy('setNewPersonModalOpenSpy'),
            setNewSpaceModalOpen: jasmine.createSpy('setNewSpaceModalOpenSpy')
        };

        menu = RenderComponent(Menu, <Menu {...props} />);

        var Modals = ReactTestUtils.scryRenderedComponentsWithType(menu, ModalMock);
        newPersonModal = Modals[0];
        newSpaceModal = Modals[1];

        newPersonForm = ReactTestUtils.findRenderedComponentWithType(newPersonModal, NameFormMock);
        newSpaceForm = ReactTestUtils.findRenderedComponentWithType(newSpaceModal, NameFormMock);
    });

    it('has button workspace.components as children', function() {
        var primaryButtons = ReactTestUtils.scryRenderedComponentsWithType(menu, PrimaryButtonMock);

        expect(primaryButtons.length).toBe(3);
        expect(primaryButtons[0].props.name).toBe("Add Person");
        expect(primaryButtons[0].props.clickFunction).toBe(menu.openNewPersonModal);
        expect(primaryButtons[1].props.name).toBe("Add Space");
        expect(primaryButtons[1].props.clickFunction).toBe(menu.openNewSpaceModal);
        expect(primaryButtons[2].props.name).toBe("Lock in Pairing");
        expect(primaryButtons[2].props.clickFunction).toBe(props.savePairing);
    });

    describe('newPersonModal', function() {
        it('has a configured newPersonModal component as a child', function() {
            expect(newPersonModal.props.onRequestClose).toBe(menu.closeNewPersonModal);
        });

        it('has a configured new person form in a modal', function() {
            expect(newPersonForm.props.confirmFunction).toBe(menu.createPersonWithName);
            expect(newPersonForm.props.cancelFunction).toBe(menu.closeNewPersonModal);
        });

        describe('#openNewPersonModal', function() {
            it('shows the modal', function() {
                menu.openNewPersonModal();
                expect(props.setNewPersonModalOpen).toHaveBeenCalledWith(true);
            });
        });

        describe('#createPersonWithName', function() {
            it('should call the createPerson action with the passed in name', function() {
                menu.createPersonWithName('Luke Skywalker');
                expect(props.createPerson).toHaveBeenCalledWith('Luke Skywalker');
            });

            it('should close the modal', function() {
                menu.createPersonWithName('Luke Skywalker');
                expect(props.setNewPersonModalOpen).toHaveBeenCalledWith(false);
            });
        });
    });

    describe('newSpaceModal', function() {
        it('has a configured newSpaceModal component as a child', function() {
            expect(newSpaceModal.props.onRequestClose).toBe(menu.closeNewSpaceModal);
        });

        it('has a configured new space form in a modal', function() {
            expect(newSpaceForm.props.confirmFunction).toBe(menu.createSpaceWithName);
            expect(newSpaceForm.props.cancelFunction).toBe(menu.closeNewSpaceModal);
        });

        describe('#openNewSpaceModal', function() {
            it('shows the modal', function() {
                menu.openNewSpaceModal();
                expect(props.setNewSpaceModalOpen).toHaveBeenCalledWith(true);
            });
        });

        describe('#createSpaceWithName', function() {
            it('should call the createSpace action with the passed in name', function() {
                menu.createSpaceWithName('Luke Skywalker');
                expect(props.createSpace).toHaveBeenCalledWith('Luke Skywalker');
            });

            it('should close the modal', function() {
                menu.createSpaceWithName('Luke Skywalker');
                expect(props.setNewSpaceModalOpen).toHaveBeenCalledWith(false);
            });
        });
    });
});