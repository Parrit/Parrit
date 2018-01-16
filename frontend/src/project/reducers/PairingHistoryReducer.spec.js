import deepFreeze from 'deep-freeze'
import pairingHistoryReducer from './PairingHistoryReducer.js'

describe('PairingHistoryReducer', () => {
    it('should get the default state', () => {
        const stateBefore = undefined
        const action = {}
        const stateAfter = {
            pairingHistoryList: []
        }

        expect(pairingHistoryReducer(stateBefore, action)).toEqual(stateAfter)
    })

    describe('actions', () => {
        describe('LOAD_PAIRING_HISTORY', () => {
            it('should set the pairingHistoryList to the passed in pairingHistoryList', () => {
                const stateBefore = {
                    pairingHistoryList: []
                }

                const action = {
                    type: 'LOAD_PAIRING_HISTORY',
                    pairingHistoryList: [{shoobadooba: 'doobadoowa'}]
                }

                const stateAfter = {
                    pairingHistoryList: [{shoobadooba: 'doobadoowa'}]
                }

                deepFreeze(stateBefore)
                deepFreeze(action)

                expect(pairingHistoryReducer(stateBefore, action)).toEqual(stateAfter)
            })
        })

        describe('UPDATE_PAIRING_HISTORIES', () => {
            it('should add the new pairing histories to front of the pairingHistoryList', () => {
                const stateBefore = {
                    pairingHistoryList: [{shoobadooba: 'doobadoowa'}]
                }

                const action = {
                    type: 'UPDATE_PAIRING_HISTORIES',
                    newPairingHistories: [{newbadooba: 'babadooba'}, {baduuuuba: 'beboopa'}]
                }

                const stateAfter = {
                    pairingHistoryList: [{newbadooba: 'babadooba'}, {baduuuuba: 'beboopa'}, {shoobadooba: 'doobadoowa'}]
                }

                deepFreeze(stateBefore)
                deepFreeze(action)

                expect(pairingHistoryReducer(stateBefore, action)).toEqual(stateAfter)
            })
        })
    })
})
