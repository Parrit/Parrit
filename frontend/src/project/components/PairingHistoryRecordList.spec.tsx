import * as React from 'react'
import * as ShallowRenderer from 'react-test-renderer/shallow';
import {PairingHistoryRecordList} from "./PairingHistoryRecordList";

describe('<PairingHistoryRecordList/>', () => {
    let wrapper

    const firstHistory = {
        pairingHistories: [
            {pairingBoardName: 'board1', people: [{name: 'joe'}, {name: 'tom'}]},
            {pairingBoardName: 'board2', people: [{name: 'bob'}]}
        ], pairingTime: 'time1'
    };
    const secondHistory = {
        pairingHistories: [{
            pairingBoardName: 'board1',
            people: [{name: 'jim'}, {name: 'billy'}, {name: 'bobby'}]
        }], pairingTime: 'time2'
    };

    beforeEach(() => {
        const renderer = ShallowRenderer.createRenderer();
        renderer.render(<PairingHistoryRecordList pairingHistoryList={[firstHistory, secondHistory]}/>);
        wrapper = renderer.getRenderOutput();
    })

    it('renders pairing history records grouped by pairing time', () => {
        const pairingHistoryRecords = wrapper.props.children

        expect(pairingHistoryRecords.length).toBe(2)

        expect(pairingHistoryRecords[0].props.pairingArrangement).toEqual(firstHistory);
        expect(pairingHistoryRecords[1].props.pairingArrangement).toEqual(secondHistory);
    })
})