var React = require('react');
var ReactDOM = require('react-dom');
var ReactTestUtils = require('react-addons-test-utils');

var RenderComponent = require('support/RenderComponent.js');
var Mocker = require('support/ComponentMocker.js');

var NewWorkspaceForm = require('shared/components/NewWorkspaceForm.js');

var PrimaryButtonMock = Mocker("Button1");
var SuccessButtonMock = Mocker("Button2");
NewWorkspaceForm.__set__('PrimaryButton', PrimaryButtonMock);
NewWorkspaceForm.__set__('SuccessButton', SuccessButtonMock);

describe('NewWorkspaceForm', function() {
    var props;
    var newSpaceForm;
    var newSpaceFormElement;
    var nameInput;
    var passwordInput;
    var confirmButton;
    var cancelButton;
    beforeEach(function() {
        props  = {
            confirmFunction: jasmine.createSpy('newSpaceConfirmSpy'),
            cancelFunction: function() {}
        };

        newSpaceForm = RenderComponent(NewWorkspaceForm, <NewWorkspaceForm {...props} />);
        newSpaceFormElement = ReactDOM.findDOMNode(newSpaceForm);

        var inputs = ReactTestUtils.scryRenderedDOMComponentsWithTag(newSpaceForm, 'input');
        nameInput = inputs[0];
        passwordInput = inputs[1];

        confirmButton = ReactTestUtils.findRenderedComponentWithType(newSpaceForm, SuccessButtonMock);
        cancelButton = ReactTestUtils.findRenderedComponentWithType(newSpaceForm, PrimaryButtonMock);
    });

    it('has name and password input fields', function() {
        expect(nameInput).toBeTruthy();
        expect(passwordInput).toBeTruthy();
    });

    it('has a confirm button of type submit', function() {
        expect(confirmButton.props.name).toBe('Save');
        expect(confirmButton.props.type).toBe('submit');
    });

    it('has a cancel button that calls the cancelFunction', function() {
        expect(cancelButton.props.name).toBe('Cancel');
        expect(cancelButton.props.clickFunction).toBe(props.cancelFunction);
    });

    describe('#submit', function() {
        var e;
        beforeEach(function() {
            e = {preventDefault: jasmine.createSpy('preventDefaultSpy')};
        });

        it('calls prevent default', function() {
            newSpaceForm.setState({name: 'stuff'});
            newSpaceForm.submit(e);
            expect(e.preventDefault).toHaveBeenCalled();
        });

        it('should call the confirm function with the name on the state', function() {
            newSpaceForm.setState({name: 'stuff', password: 'cheese'});
            newSpaceForm.submit(e);
            expect(props.confirmFunction).toHaveBeenCalledWith('stuff', 'cheese');
        });
    });
});