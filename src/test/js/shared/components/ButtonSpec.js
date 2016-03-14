var React = require('react');
var ReactDOM = require('react-dom');
var ReactTestUtils = require('react-addons-test-utils');

var RenderComponent = require('support/RenderComponent.js');
var Button = require('shared/components/Button.js');

describe('Button', function() {
    describe('#createButtonClass', function() {
        var props;
        var renderedButton;
        beforeEach(function() {
            props = {
                name: 'button',
                className: 'ooga-booga'
            };

            renderedButton = RenderComponent(Button, <Button {...props} />);
        });

        it('should have the passed in css classes', function() {
            expect(ReactDOM.findDOMNode(renderedButton).classList).toContain('ooga-booga');
        });

        it('should have a button type', function() {
            expect(ReactDOM.findDOMNode(renderedButton).type).toBe('button');
        });

        it('should use the passed in button type if provided', function() {
            props.type = 'submit';
            renderedButton = RenderComponent(Button, <Button {...props} />);
            expect(ReactDOM.findDOMNode(renderedButton).type).toBe('submit');
        });

        it('should call the click function when clicked if provided', function() {
            props.clickFunction = jasmine.createSpy('clickFunctionSpy');
            renderedButton = RenderComponent(Button, <Button {...props} />);

            expect(props.clickFunction).not.toHaveBeenCalled();
            ReactTestUtils.Simulate.click(ReactDOM.findDOMNode(renderedButton));
            expect(props.clickFunction).toHaveBeenCalled();
        });

        it('should display the alternate short name given', function() {
            props.shortName = 'short';
            renderedButton = RenderComponent(Button, <Button {...props} />);

            var shortName = ReactTestUtils.findRenderedDOMComponentWithClass(renderedButton, 'short-name');
            expect(shortName.innerHTML).toBe("short");
        });

        it('defaults short name to the name property when no short name is provided', function() {
            var shortName = ReactTestUtils.findRenderedDOMComponentWithClass(renderedButton, 'short-name');
            expect(shortName.innerHTML).toBe("button");
        });
    });
});