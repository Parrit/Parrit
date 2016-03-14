var React = require('react');
var ReactDOM = require('react-dom');
var ReactTestUtils = require('react-addons-test-utils');

var RenderComponent = require('support/RenderComponent.js');

var Buttons = require('shared/components/Buttons.js');
var createButtonClass = Buttons.__get__('createButtonClass');

describe('Buttons', function() {
    describe('#createButtonClass', function() {
        var props;
        var ButtonClass;
        var renderedButtonClass;
        beforeEach(function() {
            props = {
                name: 'button'
            };

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

        it('should display the alternate short name given', function() {
            props.shortName = 'short';
            renderedButtonClass = RenderComponent(ButtonClass, <ButtonClass {...props} />);

            var shortName = ReactTestUtils.findRenderedDOMComponentWithClass(renderedButtonClass, 'short-name');
            expect(shortName.innerHTML).toBe("short");
        });

        it('defaults short name to the name property when no short name is provided', function() {
            var shortName = ReactTestUtils.findRenderedDOMComponentWithClass(renderedButtonClass, 'short-name');
            expect(shortName.innerHTML).toBe("button");
        });
    });
});