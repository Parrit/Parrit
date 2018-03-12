import deepFreeze from 'deep-freeze'
import projectReducer from './ProjectReducer.js'

describe('ProjectReducer', () => {
    it('should get the default state', () => {
        const stateBefore = undefined
        const action = {}
        const stateAfter = {
            id: 0,
            people: [],
            pairingBoards: []
        }

        expect(projectReducer(stateBefore, action)).toEqual(stateAfter)
    })

    describe('actions', () => {
        describe('LOAD_PROJECT', () => {
            it('should set the project to the passed in project object', () => {
                const stateBefore = {
                    id: 77,
                    people: [{name: 'Billy'}],
                    pairingBoards: []
                }

                const action = {
                    type: 'LOAD_PROJECT',
                    project: {
                        shoobadooba: 'doobadoowa'
                    }
                }

                const stateAfter = {
                    shoobadooba: 'doobadoowa'
                }

                deepFreeze(stateBefore)
                deepFreeze(action)

                expect(projectReducer(stateBefore, action)).toEqual(stateAfter)
            })
        })
    })
})
