import deepFreeze from 'deep-freeze'
import systemAlertReducer from './SystemAlertReducer.js'

describe('SystemAlertReducer', () => {
    it('sets up the default state', () => {
        const stateBefore = undefined
        const action = {}
        const stateAfter = {
            message: undefined
        }

        expect(systemAlertReducer(stateBefore, action)).toEqual(stateAfter)
    })

    describe('actions', () => {
        describe('SET_SYSTEM_ALERT_MESSAGE', () => {
            it('sets the message to the passed in value', () => {
                const stateBefore = {
                    message: undefined
                }

                const action = {
                    type: 'SET_SYSTEM_ALERT_MESSAGE',
                    message: 'Hello. Something just happened!'
                }

                const stateAfter = {
                    message: 'Hello. Something just happened!'
                }

                deepFreeze(stateBefore)
                deepFreeze(action)

                expect(systemAlertReducer(stateBefore, action)).toEqual(stateAfter)
            })
        })

        describe('CLEAR_SYSTEM_ALERT_MESSAGE', () => {
            it('clears the message', () => {
                const stateBefore = {
                    message: 'Hello. Something just happened!'
                }

                const action = {
                    type: 'CLEAR_SYSTEM_ALERT_MESSAGE',
                }

                const stateAfter = {
                    message: undefined
                }

                deepFreeze(stateBefore)
                deepFreeze(action)

                expect(systemAlertReducer(stateBefore, action)).toEqual(stateAfter)
            })
        })
    })
})
