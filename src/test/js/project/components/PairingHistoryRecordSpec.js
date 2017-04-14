const React = require('react');
const ReactTestUtils = require('react-dom/test-utils');
const Moment = require('moment-timezone');

const RenderComponent = require('support/RenderComponent.js');

const PairingHistoryRecord = require('project/components/PairingHistoryRecord.js');

describe('PairingHistoryRecord', function() {
    let props;
    let pairingHistoryRecord;

    beforeEach(function() {
        jasmine.clock().install();
        jasmine.clock().mockDate(Moment('2016-03-08T13:30:00.000−0800', 'YYYY-MM-DD[T]HH:mm:ss.SSS[Z]').toDate());

        props = {
            pairingTime: '2016-03-08T17:30:00.000+0000',
            pairingBoardsWithPeople: [
                {pairingBoardName: 'board1', people: [{name: 'Bob'}, {name: 'Billy'}]},
                {pairingBoardName: 'board2', people: [{name: 'Alice'}]}
            ]
        };

        spyOn(Moment.tz, "guess").and.returnValue("America/Los_Angeles");

        pairingHistoryRecord = RenderComponent(PairingHistoryRecord, <PairingHistoryRecord {...props}/>);
    });

    afterEach(function() {
        jasmine.clock().uninstall();
    });

    it('displays the pairing time in the local timezone', function() {
        const pairingTime = ReactTestUtils.findRenderedDOMComponentWithClass(pairingHistoryRecord, 'pairing-time');
        expect(pairingTime.innerHTML).toBe('March 8, 2016 9:30 AM'); //CSS transform to uppercase
    });

    it('displays the pairing boards with the people', function() {
        const pairingBoardNames = ReactTestUtils.scryRenderedDOMComponentsWithClass(pairingHistoryRecord, 'pairing-board-name');
        expect(pairingBoardNames[0].innerHTML).toContain('board1');
        expect(pairingBoardNames[1].innerHTML).toContain('board2');

        const peopleNames = ReactTestUtils.scryRenderedDOMComponentsWithClass(pairingHistoryRecord, 'person-name');
        expect(peopleNames[0].innerHTML).toContain('Bob');
        expect(peopleNames[1].innerHTML).toContain('Billy');
        expect(peopleNames[2].innerHTML).toContain('Alice');
    });
});
