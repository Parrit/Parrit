import deepFreeze from 'deep-freeze'
import pairingHistoryPanelReducer from './PairingHistoryPanelReducer.js'

describe('PairingHistoryPanelReducer', () => {
	it('sets up the default state', () => {
		const stateBefore = undefined
		const action = {}
		const stateAfter = {
            isOpen: false
		}

		expect(pairingHistoryPanelReducer(stateBefore, action)).toEqual(stateAfter)
	})

	describe('actions', () => {
        describe('SET_PAIRING_HISTORY_PANEL_OPEN', () => {
            it('sets isPairingHistoryPanelOpen to the passed in value', () => {
                const stateBefore = {
                    isOpen: false
                }

                const action = {
                    type: 'SET_PAIRING_HISTORY_PANEL_OPEN',
                    isOpen: true
                }

                const stateAfter = {
                    isOpen: true
                }

                deepFreeze(stateBefore)
                deepFreeze(action)

                expect(pairingHistoryPanelReducer(stateBefore, action)).toEqual(stateAfter)
            })
        })
	})
})
