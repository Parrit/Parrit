var React = require('react');
var ReactDOM = require('react-dom');
var ReactTestUtils = require('react-addons-test-utils');

var RenderComponent = require('support/RenderComponent.js');
var Mocker = require('support/ComponentMocker.js');

var PairingBoard = require('workspace/components/PairingBoard.js');
var PersonListMock = Mocker("PersonList");
PairingBoard.__set__('PersonList', PersonListMock);

describe('PairingBoard', function() {
    var props;
    var pairingBoard;
    beforeEach(function() {
        props  = {
            name: "PairingBoard1",
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

        pairingBoard = RenderComponent(PairingBoard, <PairingBoard {...props} />);
    });

    it('renders the space element with an id relative to index', function() {
        var spaceElement = ReactDOM.findDOMNode(pairingBoard);
        expect(spaceElement.id).toBe("space_1", "No correct id");
    });

    it('renders the list of people', function() {
        var people = ReactTestUtils.findRenderedComponentWithType(pairingBoard, PersonListMock);
        expect(people.props.people).toBe(props.people);
        expect(people.props.index).toBe(props.index);
    });

    it('renders a delete button', function() {
        var deleteButton = ReactTestUtils.findRenderedDOMComponentWithClass(pairingBoard, 'delete-pairing-board');
        expect(deleteButton).toBeTruthy();
    });

    describe('#deleteSpace', function() {
        it('calls the deleteSpace prop function with the index prop', function() {
            pairingBoard.deleteSpace();
            expect(props.deleteSpace).toHaveBeenCalledWith(1);
        })
    });
});