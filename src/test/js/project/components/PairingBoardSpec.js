var React = require('react');
var ReactDOM = require('react-dom');
var ReactTestUtils = require('react-addons-test-utils');

var RenderComponent = require('support/RenderComponent.js');
var Mocker = require('support/ComponentMocker.js');

var PairingBoard = require('project/components/PairingBoard.js');
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
            deletePairingBoard: jasmine.createSpy('deletePairingBoardSpy'),
            renamePairingBoard: jasmine.createSpy('renamePairingBoardSpy')
        };

        pairingBoard = RenderComponent(PairingBoard, <PairingBoard {...props} />);
    });

    it('renders the pairingBoard element with an id relative to index', function() {
        var pairingBoardElement = ReactDOM.findDOMNode(pairingBoard);
        expect(pairingBoardElement.id).toBe("pairing_board_1", "No correct id");
    });

    it('renders the list of people', function() {
        var people = ReactTestUtils.findRenderedComponentWithType(pairingBoard, PersonListMock);
        expect(people.props.people).toBe(props.people);
        expect(people.props.index).toBe(props.index);
    });

    it('renders a rename button', function() {
        var renameButton = ReactTestUtils.findRenderedDOMComponentWithClass(pairingBoard, 'rename-pairing-board');
        expect(renameButton).toBeTruthy();
    });

    it('renders a delete button', function() {
        var deleteButton = ReactTestUtils.findRenderedDOMComponentWithClass(pairingBoard, 'delete-pairing-board');
        expect(deleteButton).toBeTruthy();
    });

    describe('#deletePairingBoard', function() {
        it('calls the deletePairingBoard prop function with the index prop', function() {
            pairingBoard.deletePairingBoard();
            expect(props.deletePairingBoard).toHaveBeenCalledWith(1);
        })
    });

    describe('#renamePairingBoard', function() {
        it('calls the renamePairingBoard prop function with the index prop and event target value', function() {
            var event = {target: {value: 'Cheese'}};
            pairingBoard.renamePairingBoard(event);
            expect(props.renamePairingBoard).toHaveBeenCalledWith(1, 'Cheese');
        });
    });
});