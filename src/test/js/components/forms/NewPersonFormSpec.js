var React = require('react');
var ReactDOM = require('react-dom');
var ReactTestUtils = require('react-addons-test-utils');

var RenderComponent = require('support/RenderComponent.js');

var NewPersonForm = require('components/forms/NewPersonForm.js');

describe('NewPersonForm', function() {
    var props = {
        confirmFunction: jasmine.createSpy('confirm'),
        cancelFunction: jasmine.createSpy('cancel')
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

        var buttons = ReactTestUtils.scryRenderedDOMComponentsWithTag(newPersonForm, 'button');
        confirmButton = buttons[0];
        cancelButton = buttons[1];
    });

    it('has an input field', function() {
        expect(nameInput).toBeTruthy();
    });

    it('has a confirm button that calls the confirmFunction', function() {
        expect(confirmButton).toBeTruthy();
        ReactTestUtils.Simulate.change(nameInput, {target:{value:'Jimmy Johns'}});
        ReactTestUtils.Simulate.click(confirmButton);
        expect(props.confirmFunction).toHaveBeenCalledWith('Jimmy Johns');
    });

    it('has a cancel button that calls the cancelFunction', function() {
        expect(cancelButton).toBeTruthy();
        ReactTestUtils.Simulate.click(cancelButton);
        expect(props.cancelFunction).toHaveBeenCalled();
    });
});