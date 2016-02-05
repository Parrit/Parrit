var React = require('react');
var ReactTestUtils = require('react-addons-test-utils');
var App = require('../../../main/js/components/App.js');

var Mocker = require('./ComponentMocker.js');
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

    it('has a Menu component as a child', function() {
        expect(ReactTestUtils.findRenderedComponentWithType(app, MenuMock)).toBeTruthy('No Menu component found');
    });
});