var React = require('react');
var ReactDOM = require('react-dom');

var RenderComponent = require('support/RenderComponent.js');

var Person = require('project/components/Person.js');

describe('Person', function() {
    var props = {
        name: "person",
        pairingBoardIndex: 1,
        index: 1
    };

    var person;
    var personElement;
    beforeEach(function() {
        person = RenderComponent(Person, <Person {...props} />);
        personElement = ReactDOM.findDOMNode(person);
    });

    it('renders the person element with an id relative to index', function() {
        expect(personElement.id).toBe("pairing_board_1_person_1", "No correct id");
    });

    it('should have the draggable class', function() {
        expect(personElement.classList).toContain('draggable');
    });
});