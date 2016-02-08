var React = require('react');
var ReactTestUtils = require('react-addons-test-utils');

var Mocker = require('../support/ComponentMocker.js');

var Menu = require('components/Menu.js');
var PrimaryButtonMock = Mocker("Button1");
var SuccessButtonMock = Mocker("Button2");
Menu.__set__('PrimaryButton', PrimaryButtonMock);
Menu.__set__('SuccessButton', SuccessButtonMock);

describe('Menu', function() {
    var props = {
        enableMove: {},
        disableMove: {},
        saveState: {}
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
        var first_two = ReactTestUtils.scryRenderedComponentsWithType(menu, PrimaryButtonMock);
        var saver = ReactTestUtils.findRenderedComponentWithType(menu, SuccessButtonMock);
        expect(first_two.length).toBe(2);
        expect(first_two[0].props.clickFunction).toBe(props.enableMove);
        expect(first_two[1].props.clickFunction).toBe(props.disableMove);
        expect(saver.props.clickFunction).toBe(props.saveState);
    });
});