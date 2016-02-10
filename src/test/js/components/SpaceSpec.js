var React = require('react');
var ReactDOM = require('react-dom');
var ReactTestUtils = require('react-addons-test-utils');

var Mocker = require('support/ComponentMocker.js');

var Space = require('components/Space.js');
var PersonListMock = Mocker("PersonList");
Space.__set__('PersonList', PersonListMock);

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
    beforeEach(function() {
        space = renderComponent(props);
    });

    it('renders the space element with an id relative to index', function() {
        var spaceElement = ReactDOM.findDOMNode(space);
        expect(spaceElement.id).toBe("space_1", "No correct id");
    });

    it('renders the list of people', function() {
        var people = ReactTestUtils.findRenderedComponentWithType(space, PersonListMock);
        expect(people).toBeDefined('No list of people');
        expect(people.props.people).toBe(props.people);
        expect(people.props.index).toBe(props.index);
    });
});