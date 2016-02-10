var React = require('react');
var ReactTestUtils = require('react-addons-test-utils');

var Mocker = require('support/ComponentMocker.js');

var Menu = require('components/Menu.js');
var PrimaryButtonMock = Mocker("Button1");
var SuccessButtonMock = Mocker("Button2");
Menu.__set__('PrimaryButton', PrimaryButtonMock);
Menu.__set__('SuccessButton', SuccessButtonMock);

describe('Menu', function() {
    var props = {
        enableMove: function(){},
        disableMove: function(){},
        saveState: function(){},
        createPerson: function(){}
    };

    function renderComponent(props) {
        var doc = ReactTestUtils.renderIntoDocument(<Menu {...props} />);
        return ReactTestUtils.findRenderedComponentWithType(doc, Menu);
    }

    var menu;
    beforeEach(function() {
        menu = renderComponent(props);
    });

    it('has button components as children', function() {
        var blue_buttons = ReactTestUtils.scryRenderedComponentsWithType(menu, PrimaryButtonMock);
        var saver = ReactTestUtils.findRenderedComponentWithType(menu, SuccessButtonMock);
        expect(blue_buttons.length).toBe(3);
        expect(blue_buttons[0].props.clickFunction).toBe(props.enableMove, "Enable move callback not passed");
        expect(blue_buttons[1].props.clickFunction).toBe(props.disableMove, "Disable move callback not passed");
        expect(blue_buttons[2].props.clickFunction).toBe(props.createPerson, "Create person callback not passed");
        expect(saver.props.clickFunction).toBe(props.saveState, "Save callback not passed");
    });
});