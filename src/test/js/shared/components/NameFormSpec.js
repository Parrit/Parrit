var React = require('react');
var ReactDOM = require('react-dom');
var ReactTestUtils = require('react-addons-test-utils');

var RenderComponent = require('support/RenderComponent.js');
var Mocker = require('support/ComponentMocker.js');

var NameForm = require('shared/components/NameForm.js');

var PrimaryButtonMock = Mocker("Button1");
var SuccessButtonMock = Mocker("Button2");
NameForm.__set__('PrimaryButton', PrimaryButtonMock);
NameForm.__set__('SuccessButton', SuccessButtonMock);

describe('NameForm', function() {
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
        newSpaceForm = RenderComponent(NameForm, <NameForm {...props} />);
        newSpaceFromElement = ReactDOM.findDOMNode(newSpaceForm);

        nameInput = ReactTestUtils.findRenderedDOMComponentWithTag(newSpaceForm, 'input');

        confirmButton = ReactTestUtils.findRenderedComponentWithType(newSpaceForm, SuccessButtonMock);
        cancelButton = ReactTestUtils.findRenderedComponentWithType(newSpaceForm, PrimaryButtonMock);
    });

    it('has an input field', function() {
        expect(nameInput).toBeTruthy();
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
            newSpaceForm.setState({name: "stuff"});
            newSpaceForm.submit(e);
            expect(e.preventDefault).toHaveBeenCalled();
        });

        it('should call the confirm function with the name on the state', function() {
            newSpaceForm.setState({name: "stuff"});
            newSpaceForm.submit(e);
            expect(props.confirmFunction).toHaveBeenCalledWith('stuff');
        });
    });
});