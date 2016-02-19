var React = require('react');
var ReactTestUtils = require('react-addons-test-utils');

var RenderComponent = require('support/RenderComponent.js');
var Mocker = require('support/ComponentMocker.js');

var PersonList = require('workspace/components/PersonList.js');
var PersonMock = Mocker("Person");
PersonList.__set__('Person', PersonMock);

describe('PersonList', function() {
    it('renders all of the people', function() {
        var props = {
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

        var personList = RenderComponent(PersonList, <PersonList {...props} />);

        var people = ReactTestUtils.scryRenderedComponentsWithType(personList, PersonMock);
        expect(people.length).toBe(2, 'Not enough people');

        expect(people[0].props.name).toBe("George");
        expect(people[0].props.index).toBe(0);
        expect(people[0].props.spaceIndex).toBe(1);

        expect(people[1].props.name).toBe("Hank Muchacho");
        expect(people[1].props.index).toBe(1);
        expect(people[1].props.spaceIndex).toBe(1);
    });

    it('can render two people with the same name', function() {
        var props = {
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
        };

        var personList = RenderComponent(PersonList, <PersonList {...props} />);

        var people = ReactTestUtils.scryRenderedComponentsWithType(personList, PersonMock);
        expect(people.length).toBe(2, 'Not enough people');

        expect(people[0].props.name).toBe("Hank Muchacho");
        expect(people[0].props.index).toBe(0);
        expect(people[0].props.spaceIndex).toBe(1);

        expect(people[1].props.name).toBe("Hank Muchacho");
        expect(people[1].props.index).toBe(1);
        expect(people[1].props.spaceIndex).toBe(1);
    });
});
