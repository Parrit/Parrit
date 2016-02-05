var React = require('react');
var ReactTestUtils = require('react-addons-test-utils');
var App = require('../../../main/js/components/App.js');

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
        var renderer = ReactTestUtils.createRenderer();
        renderer.render(<App {...propos} />);
        return renderer.getRenderOutput();
    }

    var app;
    beforeEach(function() {
        app = renderComponent(props);
    });

    xit('calls the loadState action', function() {
        expect(loadStateSpy).toHaveBeenCalled();
    });

    xit('has a Menu component as a child', function() {
        expect(app.props.children).toContain('<Menu/>');
    });
});