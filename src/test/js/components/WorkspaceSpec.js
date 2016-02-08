var React = require('react');
var ReactTestUtils = require('react-addons-test-utils');

var Mocker = require('../support/ComponentMocker.js');

var Workspace = require('components/Workspace.js');
var SpaceMock = Mocker("Space");
Workspace.__set__('Space', SpaceMock);

describe('Workspace', function() {
    var props = {
        workspace: {
            spaces: [
                {
                    name: "Space1",
                    people: [
                        {
                            name: "George"
                        }
                    ]
                },
                {
                    name: "Ghost",
                    people: [
                        {
                            name: "Coast2Coast"
                        }
                    ]
                }
            ]
        }
    };

    function renderComponent(props) {
        var blah = ReactTestUtils.renderIntoDocument(<Workspace {...props} />);
        return ReactTestUtils.findRenderedComponentWithType(blah, Workspace);
    }

    var workspace;
    beforeEach(function() {
        workspace = renderComponent(props);
    });

    it('renders all of the spaces', function() {
        var spaces = ReactTestUtils.scryRenderedComponentsWithType(workspace, SpaceMock);
        expect(spaces.length).toBe(2, 'No enough spaces');

        expect(spaces[0].props.name).toBe("Space1");
        expect(spaces[0].props.people).toEqual([{name:"George"}]);
        expect(spaces[0].props.index).toBe(0);

        expect(spaces[1].props.name).toBe("Ghost");
        expect(spaces[1].props.people).toEqual([{name:"Coast2Coast"}]);
        expect(spaces[1].props.index).toBe(1);
    });
});