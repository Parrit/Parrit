var React = require('react');
var ReactDOM = require('react-dom');
var ReactTestUtils = require('react-addons-test-utils');

var RenderComponent = require('support/RenderComponent.js');
var Mocker = require('support/ComponentMocker.js');

var Space = require('components/Space.js');
var PersonListMock = Mocker("PersonList");
var DangerButtonMock = Mocker('DangerButton');
Space.__set__('PersonList', PersonListMock);
Space.__set__('DangerButton', DangerButtonMock);

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
        index: 1,
        deleteSpace: jasmine.createSpy('deleteSpaceSpy')
    };

    var space;
    beforeEach(function() {
        space = RenderComponent(Space, <Space {...props} />);
    });

    it('renders the space element with an id relative to index', function() {
        var spaceElement = ReactDOM.findDOMNode(space);
        expect(spaceElement.id).toBe("space_1", "No correct id");
    });

    it('renders the list of people', function() {
        var people = ReactTestUtils.findRenderedComponentWithType(space, PersonListMock);
        expect(people.props.people).toBe(props.people);
        expect(people.props.index).toBe(props.index);
    });

    it('renders a delete button', function() {
        var deleteButton = ReactTestUtils.findRenderedComponentWithType(space, DangerButtonMock);
        expect(deleteButton.props.name).toBe("X");
        expect(deleteButton.props.clickFunction).toBe(space.deleteSpace);
    });

    describe('#deleteSpace', function() {
        it('calls the deleteSpace prop function with the index prop', function() {
            space.deleteSpace();
            expect(props.deleteSpace).toHaveBeenCalledWith(1);
        })
    });
});