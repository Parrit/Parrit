var React = require('react');
var ReactDOM = require('react-dom');
var ReactTestUtils = require('react-addons-test-utils');

var RenderComponent = require('support/RenderComponent.js');

var NameForm = require('shared/components/NameForm.js');

describe('NameForm', function() {
    var props;
    var nameForm;
    var nameFormElement;
    var input;
    beforeEach(function() {
        props  = {
            formTitle: "Form Title",
            confirmFunction: jasmine.createSpy('confirmFunctionSpy'),
            cancelFunction: jasmine.createSpy('cancelFunctionSpy'),
            errorMessage: 'ERROR'
        };

        nameForm = RenderComponent(NameForm, <NameForm {...props} />);
        nameFormElement = ReactDOM.findDOMNode(nameForm);

        input = ReactTestUtils.findRenderedDOMComponentWithTag(nameForm, 'input');
    });

    it('displays the form title', function() {
        var formTitle = ReactTestUtils.findRenderedDOMComponentWithClass(nameForm, 'form-title');
        expect(formTitle.innerHTML).toBe("Form Title");
    });

    it('has a cancel button', function() {
        var cancel = ReactTestUtils.findRenderedDOMComponentWithClass(nameForm, 'form-cancel');
        expect(cancel).toBeTruthy();
    });

    it('has an input field', function() {
        expect(input).toBeTruthy();
    });

    it('displays the error message', function() {
        var errorMessage = ReactTestUtils.findRenderedDOMComponentWithClass(nameForm, 'error-message');
        expect(errorMessage.innerHTML).toBe('ERROR');
    });

    describe('#submit', function() {
        var e;
        beforeEach(function() {
            e = {preventDefault: jasmine.createSpy('preventDefaultSpy')};
        });

        it('calls prevent default', function() {
            nameForm.setState({name: "stuff"});
            nameForm.submit(e);
            expect(e.preventDefault).toHaveBeenCalled();
        });

        it('should call the confirm function with the name on the state', function() {
            nameForm.setState({name: "stuff"});
            nameForm.submit(e);
            expect(props.confirmFunction).toHaveBeenCalledWith('stuff');
        });
    });
});