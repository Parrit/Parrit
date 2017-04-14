const React = require('react');
const ReactDOM = require('react-dom');
const ReactTestUtils = require('react-dom/test-utils');

const RenderComponent = require('support/RenderComponent.js');
const Mocker = require('support/ComponentMocker.js');

const PairingBoard = require('project/components/PairingBoard.js');
const PersonListMock = Mocker("PersonList");
PairingBoard.__set__('PersonList', PersonListMock);

describe('PairingBoard', function() {
    let props;
    let pairingBoard;
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
            exempt: false,
            deletePairingBoard: jasmine.createSpy('deletePairingBoardSpy'),
            renamePairingBoard: jasmine.createSpy('renamePairingBoardSpy')
        };

        pairingBoard = RenderComponent(PairingBoard, <PairingBoard {...props} />);
    });

    it('renders the pairingBoard element with an id relative to index', function() {
        const pairingBoardElement = ReactDOM.findDOMNode(pairingBoard);
        expect(pairingBoardElement.id).toBe("pairing_board_1", "No correct id");
    });

    it('renders the list of people', function() {
        const people = ReactTestUtils.findRenderedComponentWithType(pairingBoard, PersonListMock);
        expect(people.props.people).toBe(props.people);
        expect(people.props.index).toBe(props.index);
    });

    it('renders a rename button', function() {
        const renameButton = ReactTestUtils.findRenderedDOMComponentWithClass(pairingBoard, 'rename-pairing-board');
        expect(renameButton).toBeTruthy();
    });

    it('renders a delete button', function() {
        const deleteButton = ReactTestUtils.findRenderedDOMComponentWithClass(pairingBoard, 'delete-pairing-board');
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
            const event = {target: {value: 'Cheese'}};
            pairingBoard.renamePairingBoard(event);
            expect(props.renamePairingBoard).toHaveBeenCalledWith(1, 'Cheese');
        });
    });

    describe('Exempt PairingBoard', function() {
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
                    exempt: true,
                    deletePairingBoard: jasmine.createSpy('deletePairingBoardSpy'),
                    renamePairingBoard: jasmine.createSpy('renamePairingBoardSpy')
                };

                pairingBoard = RenderComponent(PairingBoard, <PairingBoard {...props} />);
        });

        it('renders an exempt header', function() {
            const exemptHeader = ReactTestUtils.findRenderedDOMComponentWithClass(pairingBoard, 'pairing-board exempt');
            expect(exemptHeader).toBeTruthy();
        });

        it('does not render a delete button', function() {
            expect(ReactTestUtils.scryRenderedDOMComponentsWithClass(pairingBoard, 'delete-pairing-board').length).toEqual(0);
        });
    });
});