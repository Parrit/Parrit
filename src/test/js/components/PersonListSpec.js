var React = require('react');
var ReactTestUtils = require('react-addons-test-utils');

var Mocker = require('support/ComponentMocker.js');

var PersonList = require('components/PersonList.js');
var PersonMock = Mocker("PersonContainer");
PersonList.__set__('PersonContainer', PersonMock);

describe('PersonList', function() {
    function renderComponent(props) {
        var blah = ReactTestUtils.renderIntoDocument(<PersonList {...props} />);
        return ReactTestUtils.findRenderedComponentWithType(blah, PersonList);
    }

    it('renders all of the people', function() {
        var space = renderComponent({
            people: [
                {
                    name: "George"
                },
                {
                    name: "Hank Muchacho"
                }
            ],
            index: 1
        });
        var people = ReactTestUtils.scryRenderedComponentsWithType(space, PersonMock);
        expect(people.length).toBe(2, 'Not enough people');

        expect(people[0].props.name).toBe("George");
        expect(people[0].props.index).toBe(0);
        expect(people[0].props.spaceIndex).toBe(1);

        expect(people[1].props.name).toBe("Hank Muchacho");
        expect(people[1].props.index).toBe(1);
        expect(people[1].props.spaceIndex).toBe(1);
    });

    it('can render two people with the same name', function() {
        var space = renderComponent({
            name: "Space1",
            people: [
                {
                    name: "Hank Muchacho"
                },
                {
                    name: "Hank Muchacho"
                }
            ],
            index: 1
        });
        var people = ReactTestUtils.scryRenderedComponentsWithType(space, PersonMock);
        expect(people.length).toBe(2, 'Not enough people');

        expect(people[0].props.name).toBe("Hank Muchacho");
        expect(people[0].props.index).toBe(0);
        expect(people[0].props.spaceIndex).toBe(1);

        expect(people[1].props.name).toBe("Hank Muchacho");
        expect(people[1].props.index).toBe(1);
        expect(people[1].props.spaceIndex).toBe(1);
    });
});
