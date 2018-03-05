import React from 'react'
import { shallow } from 'enzyme'

import PairingHistoryRecordList from './PairingHistoryRecordList.js'

describe('<PairingHistoryRecordList/>', () => {
    let wrapper, props

    beforeEach(() => {
        props = {
            pairingHistoryList: [
                {pairingTime: 'time1', people:[{name: 'joe'}, {name: 'tom'}], pairingBoardName: 'board1'},
                {pairingTime: 'time1', people:[{name: 'bob'}], pairingBoardName: 'board2'},
                {pairingTime: 'time2', people:[{name: 'jim'}, {name: 'billy'}, {name: 'bobby'}], pairingBoardName: 'board1'}
            ]
        }

        wrapper = shallow(<PairingHistoryRecordList {...props}/>)
    })
    
    it('renders pairing history records grouped by pairing time', () => {
        const pairingHistoryRecords = wrapper.find('PairingHistoryRecord')
        
        expect(pairingHistoryRecords.length).toBe(2)
        
        expect(pairingHistoryRecords.at(0).prop('pairingTime')).toBe('time1')
        expect(pairingHistoryRecords.at(0).prop('pairingBoardsWithPeople')).toEqual([
            {pairingBoardName: 'board1', people: [{name: 'joe'}, {name: 'tom'}]},
            {pairingBoardName: 'board2', people: [{name: 'bob'}]}
        ])

        expect(pairingHistoryRecords.at(1).prop('pairingTime')).toBe('time2')
        expect(pairingHistoryRecords.at(1).prop('pairingBoardsWithPeople')).toEqual([
            {pairingBoardName: 'board1', people: [{name: 'jim'}, {name: 'billy'}, {name: 'bobby'}]}
        ])
    })
})