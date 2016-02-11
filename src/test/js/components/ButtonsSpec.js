var React = require('react');
var ReactDOM = require('react-dom');
var ReactTestUtils = require('react-addons-test-utils');

var RenderComponent = require('support/RenderComponent.js');

var Buttons = require('components/Buttons.js');
var createButtonClass = Buttons.__get__('createButtonClass');

describe('Buttons', function() {
    describe('#createButtonClass', function() {
        var ButtonClass;
        var props = {
            name: 'button',
            clickFunction: jasmine.createSpy('clickFunctionSpy')
        };
        var renderedButtonClass;

        beforeEach(function() {
            ButtonClass = createButtonClass('ooga-booga');
            renderedButtonClass = RenderComponent(ButtonClass, <ButtonClass {...props} />);
        });

        it('should have the right css classes', function() {
            expect(ReactDOM.findDOMNode(renderedButtonClass).classList).toContain('btn-ooga-booga');
        });

        it('should call the click function when clicked', function() {
            expect(props.clickFunction).not.toHaveBeenCalled();
            ReactTestUtils.Simulate.click(ReactDOM.findDOMNode(renderedButtonClass));
            expect(props.clickFunction).toHaveBeenCalled();
        });
    });
});