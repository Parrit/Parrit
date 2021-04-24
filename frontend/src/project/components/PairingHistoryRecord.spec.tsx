import * as React from 'react'
import * as timezoneMock from 'timezone-mock'
import PairingHistoryRecord from "./PairingHistoryRecord";
import * as renderer from 'react-test-renderer';

describe('<PairingHistoryRecord/>', () => {
    let pairingArrangement

    beforeAll(() => {
        timezoneMock.register('US/Pacific')
    })

    afterAll(() => {
        timezoneMock.unregister()
    })

    beforeEach(() => {
        pairingArrangement = {
            pairingTime: '2016-03-08T17:30:00.000+0000',
            pairingHistories: [
                {pairingBoardName: 'board1', people: [{name: 'Bob'}, {name: 'Billy'}]},
                {pairingBoardName: 'board2', people: [{name: 'Alice'}]}
            ]
        }
    })

    it('should render correctly', () => {
        const tree = renderer.create(<PairingHistoryRecord pairingArrangement={pairingArrangement}/>).toJSON();
        expect(tree).toMatchSnapshot();
    })
})
