var React = require('react');
var ReactDOM = require('react-dom');
var ReactTestUtils = require('react-addons-test-utils');

var RenderComponent = require('support/RenderComponent.js');

var Buttons = require('workspace/components/Buttons.js');
var createButtonClass = Buttons.__get__('createButtonClass');

describe('Buttons', function() {
    describe('#createButtonClass', function() {
        var props = {
            name: 'button'
        };

        var ButtonClass;
        var renderedButtonClass;
        beforeEach(function() {
            ButtonClass = createButtonClass('ooga-booga');
            renderedButtonClass = RenderComponent(ButtonClass, <ButtonClass {...props} />);
        });

        it('should have the right css classes', function() {
            expect(ReactDOM.findDOMNode(renderedButtonClass).classList).toContain('btn-ooga-booga');
        });

        it('should have a button type', function() {
            expect(ReactDOM.findDOMNode(renderedButtonClass).type).toBe('button');
        });

        it('should use the passed in button type if provided', function() {
            props.type = 'submit';
            renderedButtonClass = RenderComponent(ButtonClass, <ButtonClass {...props} />);
            expect(ReactDOM.findDOMNode(renderedButtonClass).type).toBe('submit');
        });

        it('should call the click function when clicked if provided', function() {
            props.clickFunction = jasmine.createSpy('clickFunctionSpy');
            renderedButtonClass = RenderComponent(ButtonClass, <ButtonClass {...props} />);

            expect(props.clickFunction).not.toHaveBeenCalled();
            ReactTestUtils.Simulate.click(ReactDOM.findDOMNode(renderedButtonClass));
            expect(props.clickFunction).toHaveBeenCalled();
        });
    });
});