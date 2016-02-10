var React = require('react');
var ReactTestUtils = require('react-addons-test-utils');

var RenderComponent = require('support/RenderComponent.js');
var Mocker = require('support/ComponentMocker.js');

var Menu = require('components/Menu.js');
var PrimaryButtonMock = Mocker("Button1");
var SuccessButtonMock = Mocker("Button2");
var ModalMock = Mocker("Modal");
var NewPersonFormMock = Mocker("NewPersonForm");
Menu.__set__('PrimaryButton', PrimaryButtonMock);
Menu.__set__('SuccessButton', SuccessButtonMock);
Menu.__set__('Modal', ModalMock);
Menu.__set__('NewPersonForm', NewPersonFormMock);

describe('Menu', function() {
    var props = {
        enableMove: function(){},
        disableMove: function(){},
        saveState: function(){},
        createPerson: jasmine.createSpy()
    };

    var menu;
    var newPersonModal;
    var newPersonForm;
    beforeEach(function() {
        menu = RenderComponent(Menu, <Menu {...props} />);
        newPersonModal = ReactTestUtils.findRenderedComponentWithType(menu, ModalMock);
        newPersonForm = ReactTestUtils.findRenderedComponentWithType(newPersonModal, NewPersonFormMock);
    });

    it('has button components as children', function() {
        var blueButtons = ReactTestUtils.scryRenderedComponentsWithType(menu, PrimaryButtonMock);
        var saver = ReactTestUtils.findRenderedComponentWithType(menu, SuccessButtonMock);

        expect(blueButtons.length).toBe(3);
        expect(blueButtons[0].props.clickFunction).toBe(props.enableMove, "Enable move callback not passed");
        expect(blueButtons[1].props.clickFunction).toBe(props.disableMove, "Disable move callback not passed");
        expect(blueButtons[2].props.clickFunction).toBe(menu.openNewPersonModal, "Create person callback not passed");

        expect(saver.props.clickFunction).toBe(props.saveState, "Save callback not passed");
    });

    it('has a configured modal component as a child', function() {
        expect(newPersonModal.props.onRequestClose).toBe(menu.closeNewPersonModal);
    });

    it('has a configured new person form in the modal', function() {
        expect(newPersonForm.props.confirmFunction).toBe(menu.createPersonWithName);
        expect(newPersonForm.props.cancelFunction).toBe(menu.closeNewPersonModal);
    });

    describe('#openNewPersonModal', function() {
        it('shows the modal', function() {
            expect(newPersonModal.props.isOpen).toBeFalsy();
            menu.openNewPersonModal();
            expect(newPersonModal.props.isOpen).toBeTruthy();
        });
    });

    describe('#createPersonWithName', function() {
        it('should call the createPerson action with the passed in name', function() {
            menu.createPersonWithName('Luke Skywalker');
            expect(props.createPerson).toHaveBeenCalledWith('Luke Skywalker');
        });

        it('should close the modal', function() {
            menu.openNewPersonModal();
            expect(newPersonModal.props.isOpen).toBeTruthy();
            menu.createPersonWithName('Luke Skywalker');
            expect(newPersonModal.props.isOpen).toBeFalsy();
        });
    });
});