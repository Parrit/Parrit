var React = require('react');
var ReactDOM = require('react-dom');
var ReactTestUtils = require('react-addons-test-utils');

var RenderComponent = require('support/RenderComponent.js');
var Mocker = require('support/ComponentMocker.js');

var NewPersonForm = require('components/forms/NewPersonForm.js');

var PrimaryButtonMock = Mocker("Button1");
var SuccessButtonMock = Mocker("Button2");
NewPersonForm.__set__('PrimaryButton', PrimaryButtonMock);
NewPersonForm.__set__('SuccessButton', SuccessButtonMock);

describe('NewPersonForm', function() {
    var props = {
        confirmFunction: jasmine.createSpy('newPersonConfirmSpy'),
        cancelFunction: function() {}
    };

    var newPersonForm;

    var newPersonFromElement;
    var nameInput;
    var confirmButton;
    var cancelButton;
    beforeEach(function() {
        newPersonForm = RenderComponent(NewPersonForm, <NewPersonForm {...props} />);
        newPersonFromElement = ReactDOM.findDOMNode(newPersonForm);

        nameInput = ReactTestUtils.findRenderedDOMComponentWithTag(newPersonForm, 'input');

        confirmButton = ReactTestUtils.findRenderedComponentWithType(newPersonForm, SuccessButtonMock);
        cancelButton = ReactTestUtils.findRenderedComponentWithType(newPersonForm, PrimaryButtonMock);
    });

    it('has an input field', function() {
        expect(nameInput).toBeTruthy();
    });

    it('has a confirm button that calls the submit function', function() {
        expect(confirmButton.props.name).toBe('Save');
        expect(confirmButton.props.clickFunction).toBe(newPersonForm.submit);
    });

    it('has a cancel button that calls the cancelFunction', function() {
        expect(cancelButton.props.name).toBe('Cancel');
        expect(cancelButton.props.clickFunction).toBe(props.cancelFunction);
    });

    describe('#submit', function() {
        it('should call the confirm function with the name on the state', function() {
            newPersonForm.setState({name: "stuff"});
            newPersonForm.submit();
            expect(props.confirmFunction).toHaveBeenCalledWith('stuff');
        });
    });
});