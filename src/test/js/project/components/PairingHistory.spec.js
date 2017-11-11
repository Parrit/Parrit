import React from 'react';
import { shallow } from 'enzyme';

import PairingHistory from 'project/components/PairingHistory.js';

describe('<PairingHistory/>', () => {
    let wrapper, props;

    beforeEach(() => {
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

        wrapper = shallow(<PairingHistory {...props}/>);
    });

    it('calls the fetchPairingHistory action on mount', () => {
        expect(props.fetchPairingHistory).toHaveBeenCalledWith(12);
    });
    
    describe('when the pairingHistoryList has content', () => {
        it('renders the pairing history records', () => {
            const pairingHistoryRecordList = wrapper.find('PairingHistoryRecordList');
            expect(pairingHistoryRecordList.exists()).toBeTruthy();
            
            expect(pairingHistoryRecordList.prop('pairingHistoryList')).toBe(props.pairingHistoryList);
        });    
    });

    describe('when the pairingHistoryList is empty', () => {
        beforeEach(() => {
            props.pairingHistoryList = [];
            wrapper = shallow(<PairingHistory {...props}/>);
        });
        
        it('renders the no-history display text', () => {
            expect(wrapper.find('.no-history-content').text()).toBe("‘Record Pairs’ to track daily rotation history. The more you record, the better the recommendation engine becomes.")
        });
    });

    it('displays the pairing history panel when isPairingHistoryPanelOpen is true', () => {
        expect(wrapper.find('.panel-open').exists()).toBeTruthy();
    });

    it('#closePairingHistoryPanel calls setPairingHistoryPanelOpen with false', () => {
        wrapper.find('.cancel').simulate('click');
        expect(props.setPairingHistoryPanelOpen).toHaveBeenCalledWith(false);
    });
});