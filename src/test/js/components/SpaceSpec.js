var React = require('react');
var ReactDOM = require('react-dom');
var ReactTestUtils = require('react-addons-test-utils');

var Mocker = require('../support/ComponentMocker.js');

var Space = require('components/Space.js');
var PersonMock = Mocker("PersonContainer");
Space.__set__('PersonContainer', PersonMock);

describe('Space', function() {
    var props = {
        name: "Space1",
        people: [
            {
                name: "George"
            },
            {
                name: "Hank Muchacho"
            }
        ],
        index: 1
    };

    function renderComponent(props) {
        var blah = ReactTestUtils.renderIntoDocument(<Space {...props} />);
        return ReactTestUtils.findRenderedComponentWithType(blah, Space);
    }

    var space;
    var spaceElement;
    beforeEach(function() {
        space = renderComponent(props);
        spaceElement = ReactDOM.findDOMNode(space);
    });

    it('renders the space element with an id relative to index', function() {
        expect(spaceElement.id).toBe("space-1", "No correct id");
    });

    it('renders all of the people', function() {
        var people = ReactTestUtils.scryRenderedComponentsWithType(space, PersonMock);
        expect(people.length).toBe(2, 'No enough people');

        expect(people[0].props.name).toBe("George");
        expect(people[0].props.index).toBe(0);
        expect(people[0].props.spaceIndex).toBe(1);

        expect(people[1].props.name).toBe("Hank Muchacho");
        expect(people[1].props.index).toBe(1);
        expect(people[1].props.spaceIndex).toBe(1);
    });
});