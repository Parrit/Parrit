const React = require('react');
const ReactDOM = require('react-dom');
const ReactTestUtils = require('react-dom/test-utils');

const RenderComponent = require('support/RenderComponent.js');
const Mocker = require('support/ComponentMocker.js');

const PairingHistory = require('project/components/PairingHistory.js');

const PairingHistoryRecordListMock = Mocker("PairingHistoryRecordList");
PairingHistory.__set__('PairingHistoryRecordList', PairingHistoryRecordListMock);

describe('PairingHistory', function() {
    let props;
    let pairingHistory;
    let pairingHistoryElement;

    beforeEach(function() {
        props = {
            projectId: 12,
            pairingHistoryList: [
                {pairingTime: 'time1', people:[{name: 'joe'}, {name: 'tom'}], pairingBoardName: 'board1'},
                {pairingTime: 'time1', people:[{name: 'bob'}], pairingBoardName: 'board2'},
                {pairingTime: 'time2', people:[{name: 'jim'}, {name: 'billy'}, {name: 'bobby'}], pairingBoardName: 'board1'}
            ],
            fetchPairingHistory: jasmine.createSpy('fetchPairingHistorySpy'),
            setPairingHistoryPanelOpen: jasmine.createSpy('setPairingHistoryPanelOpenSpy'),
            isPairingHistoryPanelOpen: true
        };

        pairingHistory = RenderComponent(PairingHistory, <PairingHistory {...props}/>);
        pairingHistoryElement = ReactDOM.findDOMNode(pairingHistory);
    });

    it('calls the fetchPairingHistory action on mount', function() {
        expect(props.fetchPairingHistory).toHaveBeenCalledWith(12);
    });
    
    describe('when the pairingHistoryList has content', function() {
        it('renders the pairing history records', function() {
            const pairingHistoryRecordList = ReactTestUtils.findRenderedComponentWithType(pairingHistory, PairingHistoryRecordListMock);
            expect(pairingHistoryRecordList).toBeTruthy();
            
            expect(pairingHistoryRecordList.props.pairingHistoryList).toBe(props.pairingHistoryList);
        });    
    });

    describe('when the pairingHistoryList is empty', function() {
        beforeEach(function() {
            props.pairingHistoryList = [];
            pairingHistory = RenderComponent(PairingHistory, <PairingHistory {...props}/>);    
        });
        
        it('renders the no-history display text', function() {
            const noHistory = ReactTestUtils.findRenderedDOMComponentWithClass(pairingHistory, 'no-history-content');
            expect(noHistory.innerHTML).toBe("‘Record Pairs’ to track daily rotation history. The more you record, the better the recommendation engine becomes.")
        });
    });

    it('displays the pairing history panel when isPairingHistoryPanelOpen is true', function() {
        const pairingHistoryPanel = ReactTestUtils.findRenderedDOMComponentWithClass(pairingHistory, 'panel-open');
        expect(pairingHistoryPanel).toBeTruthy();
    });

    it('#closePairingHistoryPanel calls setPairingHistoryPanelOpen with false', function() {
        pairingHistory.closePairingHistoryPanel();
        expect(props.setPairingHistoryPanelOpen).toHaveBeenCalledWith(false);
    });
});