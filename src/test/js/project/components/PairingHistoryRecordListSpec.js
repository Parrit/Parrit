var React = require('react');
var ReactDOM = require('react-dom');
var ReactTestUtils = require('react-addons-test-utils');

var RenderComponent = require('support/RenderComponent.js');
var Mocker = require('support/ComponentMocker.js');

var PairingHistoryRecordList = require('project/components/PairingHistoryRecordList.js');

var PairingHistoryRecordMock = Mocker("PairingHistoryRecord");
PairingHistoryRecordList.__set__('PairingHistoryRecord', PairingHistoryRecordMock);

describe('PairingHistoryRecordList', function() {
    var props;
    var pairingHistoryRecordList;

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
        var pairingHistoryRecords = ReactTestUtils.scryRenderedComponentsWithType(pairingHistoryRecordList, PairingHistoryRecordMock);
        
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