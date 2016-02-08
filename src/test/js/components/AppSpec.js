var React = require('react');
var ReactTestUtils = require('react-addons-test-utils');

var Mocker = require('../support/ComponentMocker.js');

var App = require('components/App.js');
var MenuMock = Mocker("Menu");
var WorkspaceMock = Mocker("Workspace");
App.__set__('Menu', MenuMock);
App.__set__('Workspace', WorkspaceMock);

describe('App', function() {
    var loadStateSpy = jasmine.createSpy('loadState');

    var props = {
        settings: {},
        workspace: {
            spaces: [
                {
                    name: "Space1",
                    people: [
                        {
                            name: "George"
                        }
                    ]
                }
            ]
        },
        enableMove: {},
        disableMove: {},
        saveState: {},
        loadState: loadStateSpy
    };

    function renderComponent(propos) {
        var blah = ReactTestUtils.renderIntoDocument(<App {...propos} />);
        return ReactTestUtils.findRenderedComponentWithType(blah, App);
    }

    var app;
    beforeEach(function() {
        app = renderComponent(props);
    });

    it('calls the loadState action', function() {
        expect(loadStateSpy).toHaveBeenCalled();
    });

    it('has a configured Menu component as a child', function() {
        var menuComponent = ReactTestUtils.findRenderedComponentWithType(app, MenuMock);
        expect(menuComponent).toBeTruthy('No Menu component found');

        expect(menuComponent.props.settings).toBe(props.settings, "No settings passed to menu");
        expect(menuComponent.props.enableMove).toBe(props.enableMove, "No enableMove passed to menu");
        expect(menuComponent.props.disableMove).toBe(props.disableMove, "No disableMove passed to menu");
        expect(menuComponent.props.saveState).toBe(props.saveState, "No saveState passed to menu");
    });
});