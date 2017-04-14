const React = require('react');
const ReactTestUtils = require('react-dom/test-utils');

const RenderComponent = require('support/RenderComponent.js');
const Mocker = require('support/ComponentMocker.js');

const PairingHistoryRecordList = require('project/components/PairingHistoryRecordList.js');

const PairingHistoryRecordMock = Mocker("PairingHistoryRecord");
PairingHistoryRecordList.__set__('PairingHistoryRecord', PairingHistoryRecordMock);

describe('PairingHistoryRecordList', function() {
    let props;
    let pairingHistoryRecordList;

    beforeEach(function() {
        props = {
            pairingHistoryList: [
                {pairingTime: 'time1', people:[{name: 'joe'}, {name: 'tom'}], pairingBoardName: 'board1'},
                {pairingTime: 'time1', people:[{name: 'bob'}], pairingBoardName: 'board2'},
                {pairingTime: 'time2', people:[{name: 'jim'}, {name: 'billy'}, {name: 'bobby'}], pairingBoardName: 'board1'}
            ]
        };

        pairingHistoryRecordList = RenderComponent(PairingHistoryRecordList, <PairingHistoryRecordList {...props}/>);
    });
    
    it('renders pairing history records grouped by pairing time', function() {
        const pairingHistoryRecords = ReactTestUtils.scryRenderedComponentsWithType(pairingHistoryRecordList, PairingHistoryRecordMock);
        
        expect(pairingHistoryRecords.length).toBe(2);
        
        expect(pairingHistoryRecords[0].props.pairingTime).toBe('time1');
        expect(pairingHistoryRecords[0].props.pairingBoardsWithPeople).toEqual([
            {pairingBoardName: 'board1', people: [{name: 'joe'}, {name: 'tom'}]},
            {pairingBoardName: 'board2', people: [{name: 'bob'}]}
        ]);

        expect(pairingHistoryRecords[1].props.pairingTime).toBe('time2');
        expect(pairingHistoryRecords[1].props.pairingBoardsWithPeople).toEqual([
            {pairingBoardName: 'board1', people: [{name: 'jim'}, {name: 'billy'}, {name: 'bobby'}]}
        ]);
    })
});