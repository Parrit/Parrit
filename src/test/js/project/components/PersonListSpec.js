const React = require('react');
const ReactTestUtils = require('react-dom/test-utils');

const RenderComponent = require('support/RenderComponent.js');
const Mocker = require('support/ComponentMocker.js');

const PersonList = require('project/components/PersonList.js');
const PersonMock = Mocker("Person");
PersonList.__set__('Person', PersonMock);

describe('PersonList', function() {
    it('renders all of the people', function() {
        const props = {
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

        const personList = RenderComponent(PersonList, <PersonList {...props} />);

        const people = ReactTestUtils.scryRenderedComponentsWithType(personList, PersonMock);
        expect(people.length).toBe(2, 'Not enough people');

        expect(people[0].props.name).toBe("George");
        expect(people[0].props.index).toBe(0);
        expect(people[0].props.pairingBoardIndex).toBe(1);

        expect(people[1].props.name).toBe("Hank Muchacho");
        expect(people[1].props.index).toBe(1);
        expect(people[1].props.pairingBoardIndex).toBe(1);
    });

    it('can render two people with the same name', function() {
        const props = {
            name: "PairingBoard1",
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

        const personList = RenderComponent(PersonList, <PersonList {...props} />);

        const people = ReactTestUtils.scryRenderedComponentsWithType(personList, PersonMock);
        expect(people.length).toBe(2, 'Not enough people');

        expect(people[0].props.name).toBe("Hank Muchacho");
        expect(people[0].props.index).toBe(0);
        expect(people[0].props.pairingBoardIndex).toBe(1);

        expect(people[1].props.name).toBe("Hank Muchacho");
        expect(people[1].props.index).toBe(1);
        expect(people[1].props.pairingBoardIndex).toBe(1);
    });
});
