var React = require('react');
var ReactTestUtils = require('react-addons-test-utils');

var RenderComponent = require('support/RenderComponent.js');
var Mocker = require('support/ComponentMocker.js');

var Workspace = require('components/Workspace.js');
var SpaceMock = Mocker("Space");
var PersonListMock = Mocker("PersonList");
Workspace.__set__('Space', SpaceMock);
Workspace.__set__('PersonList', PersonListMock);

describe('Workspace', function() {
    var movePersonSpy = jasmine.createSpy;

    var props = {
        people: [
            {name:"Mike Wazowski"},
            {name:"Sully"}
        ],
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
        ],
        movePerson: movePersonSpy
    };

    var workspace;
    beforeEach(function() {
        workspace = RenderComponent(Workspace, <Workspace {...props} />);
    });

    it('renders all of the spaces in the workspace', function() {
        var spaces = ReactTestUtils.scryRenderedComponentsWithType(workspace, SpaceMock);
        expect(spaces.length).toBe(2, 'Not enough spaces');

        expect(spaces[0].props.name).toBe("Space1");
        expect(spaces[0].props.people).toEqual([{name:"George"}]);
        expect(spaces[0].props.index).toBe(0);

        expect(spaces[1].props.name).toBe("Ghost");
        expect(spaces[1].props.people).toEqual([{name:"Coast2Coast"}]);
        expect(spaces[1].props.index).toBe(1);
    });

    it('renders the list of people in the workspace', function() {
        var people = ReactTestUtils.findRenderedComponentWithType(workspace, PersonListMock);
        expect(people).toBeDefined('No list of people');
        expect(people.props.people).toBe(props.people);
        expect(people.props.index).toBe(-1);
    })
});