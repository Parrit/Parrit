var React = require('react');
var ReactDOM = require('react-dom');
var ReactTestUtils = require('react-addons-test-utils');

var RenderComponent = require('support/RenderComponent.js');
var Mocker = require('support/ComponentMocker.js');

var NewSpaceForm = require('workspace/components/forms/NewSpaceForm.js');

var PrimaryButtonMock = Mocker("Button1");
var SuccessButtonMock = Mocker("Button2");
NewSpaceForm.__set__('PrimaryButton', PrimaryButtonMock);
NewSpaceForm.__set__('SuccessButton', SuccessButtonMock);

describe('NewSpaceForm', function() {
    var props = {
        confirmFunction: jasmine.createSpy('newSpaceConfirmSpy'),
        cancelFunction: function() {}
    };

    var newSpaceForm;

    var newSpaceFromElement;
    var nameInput;
    var confirmButton;
    var cancelButton;
    beforeEach(function() {
        newSpaceForm = RenderComponent(NewSpaceForm, <NewSpaceForm {...props} />);
        newSpaceFromElement = ReactDOM.findDOMNode(newSpaceForm);

        nameInput = ReactTestUtils.findRenderedDOMComponentWithTag(newSpaceForm, 'input');

        confirmButton = ReactTestUtils.findRenderedComponentWithType(newSpaceForm, SuccessButtonMock);
        cancelButton = ReactTestUtils.findRenderedComponentWithType(newSpaceForm, PrimaryButtonMock);
    });

    it('has an input field', function() {
        expect(nameInput).toBeTruthy();
    });

    it('has a confirm button that calls the submit function', function() {
        expect(confirmButton.props.name).toBe('Save');
        expect(confirmButton.props.clickFunction).toBe(newSpaceForm.submit);
    });

    it('has a cancel button that calls the cancelFunction', function() {
        expect(cancelButton.props.name).toBe('Cancel');
        expect(cancelButton.props.clickFunction).toBe(props.cancelFunction);
    });

    describe('#submit', function() {
        it('should call the confirm function with the name on the state', function() {
            newSpaceForm.setState({name: "stuff"});
            newSpaceForm.submit();
            expect(props.confirmFunction).toHaveBeenCalledWith('stuff');
        });
    });
});