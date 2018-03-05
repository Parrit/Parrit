import deepFreeze from 'deep-freeze'
import modalReducer from './ModalReducer.js'

describe('ModalReducer', () => {
	it('sets up the default state', () => {
		const stateBefore = undefined
		const action = {}
		const stateAfter = {
            isNewPersonModalOpen: false,
            isNewPairingBoardModalOpen: false,
            isNewRoleModalOpen: false,
            newPersonModalErrorMessage: undefined,
            newPairingBoardModalErrorMessage: undefined,
            newRoleModalErrorMessage: undefined,
            newRolePairingBoardId: undefined
		}

		expect(modalReducer(stateBefore, action)).toEqual(stateAfter)
	})

	describe('actions', () => {
        describe('SET_NEW_PERSON_MODAL_OPEN', () => {
            it('sets isNewPersonModalOpen to the passed in value', () => {
                const stateBefore = {
                    isNewPersonModalOpen: false
                }

                const action = {
                    type: 'SET_NEW_PERSON_MODAL_OPEN',
                    isOpen: true
                }

                const stateAfter = {
                    isNewPersonModalOpen: true
                }

                deepFreeze(stateBefore)
                deepFreeze(action)

                expect(modalReducer(stateBefore, action)).toEqual(stateAfter)
            })

            it('clears the newPersonModalErrorMessage', () => {
                const stateBefore = {
                    isNewPersonModalOpen: true,
                    newPersonModalErrorMessage: 'some error message'
                }

                const action = {
                    type: 'SET_NEW_PERSON_MODAL_OPEN',
                    isOpen: false
                }

                const stateAfter = {
                    isNewPersonModalOpen: false,
                    newPersonModalErrorMessage: undefined
                }

                deepFreeze(stateBefore)
                deepFreeze(action)

                expect(modalReducer(stateBefore, action)).toEqual(stateAfter)
            })
        })

        describe('SET_NEW_PAIRING_BOARD_MODAL_OPEN', () => {
            it('sets isNewPairingBoardModalOpen to the passed in value', () => {
                const stateBefore = {
                    isNewPairingBoardModalOpen: false
                }

                const action = {
                    type: 'SET_NEW_PAIRING_BOARD_MODAL_OPEN',
                    isOpen: true
                }

                const stateAfter = {
                    isNewPairingBoardModalOpen: true
                }

                deepFreeze(stateBefore)
                deepFreeze(action)

                expect(modalReducer(stateBefore, action)).toEqual(stateAfter)
            })

            it('clears the newPersonModalErrorMessage', () => {
                const stateBefore = {
                    isNewPairingBoardModalOpen: true,
                    newPairingBoardModalErrorMessage: 'some error message'
                }

                const action = {
                    type: 'SET_NEW_PAIRING_BOARD_MODAL_OPEN',
                    isOpen: false
                }

                const stateAfter = {
                    isNewPairingBoardModalOpen: false,
                    newPairingBoardModalErrorMessage: undefined
                }

                deepFreeze(stateBefore)
                deepFreeze(action)

                expect(modalReducer(stateBefore, action)).toEqual(stateAfter)
            })
        })

        describe('SET_NEW_ROLE_MODAL_OPEN', () => {
            it('sets isNewRoleModalOpen and newRolePairingBoardId to the passed in values', () => {
                const stateBefore = {
                    isNewRoleModalOpen: false
                }

                const action = {
                    type: 'SET_NEW_ROLE_MODAL_OPEN',
                    isOpen: true,
                    pairingBoardId: 77
                }

                const stateAfter = {
                    isNewRoleModalOpen: true,
                    newRolePairingBoardId: 77
                }

                deepFreeze(stateBefore)
                deepFreeze(action)

                expect(modalReducer(stateBefore, action)).toEqual(stateAfter)
            })

            it('clears the newRoleModalErrorMessage', () => {
                const stateBefore = {
                    isNewRoleModalOpen: true,
                    newRolePairingBoardId: 77,
                    newRoleModalErrorMessage: 'some error message'
                }

                const action = {
                    type: 'SET_NEW_ROLE_MODAL_OPEN',
                    isOpen: false,
                    pairingBoardId: 77
                }

                const stateAfter = {
                    isNewRoleModalOpen: false,
                    newRolePairingBoardId: 77,
                    newRoleModalErrorMessage: undefined
                }

                deepFreeze(stateBefore)
                deepFreeze(action)

                expect(modalReducer(stateBefore, action)).toEqual(stateAfter)
            })
        })

        describe('SET_NEW_PERSON_MODAL_ERROR_MESSAGE', () => {
            it('sets newPersonModalErrorMessage to the name field error', () => {
                const stateBefore = {
                    newPersonModalErrorMessage: undefined
                }

                const action = {
                    type: 'SET_NEW_PERSON_MODAL_ERROR_MESSAGE',
                    errorResponse: {
                        message: 'some message',
                        fieldErrors: { name: 'some name message' }
                    }
                }

                const stateAfter = {
                    newPersonModalErrorMessage: 'some name message'
                }

                deepFreeze(stateBefore)
                deepFreeze(action)

                expect(modalReducer(stateBefore, action)).toEqual(stateAfter)
            })

            it('sets newPersonModalErrorMessage to the message when there are no field errors', () => {
                const stateBefore = {
                    newPersonModalErrorMessage: undefined
                }

                const action = {
                    type: 'SET_NEW_PERSON_MODAL_ERROR_MESSAGE',
                    errorResponse: {
                        message: 'some message',
                        fieldErrors: null
                    }
                }

                const stateAfter = {
                    newPersonModalErrorMessage: 'some message'
                }

                deepFreeze(stateBefore)
                deepFreeze(action)

                expect(modalReducer(stateBefore, action)).toEqual(stateAfter)
            })
        })

        describe('SET_NEW_PAIRING_BOARD_MODAL_ERROR_MESSAGE', () => {
            it('sets newPairingBoardModalErrorMessage to the name field error', () => {
                const stateBefore = {
                    newPairingBoardModalErrorMessage: undefined
                }

                const action = {
                    type: 'SET_NEW_PAIRING_BOARD_MODAL_ERROR_MESSAGE',
                    errorResponse: {
                        message: 'some message',
                        fieldErrors: { name: 'some name message' }
                    }
                }

                const stateAfter = {
                    newPairingBoardModalErrorMessage: 'some name message'
                }

                deepFreeze(stateBefore)
                deepFreeze(action)

                expect(modalReducer(stateBefore, action)).toEqual(stateAfter)
            })

            it('sets newPairingBoardModalErrorMessage to the message when there are no field errors', () => {
                const stateBefore = {
                    newPairingBoardModalErrorMessage: undefined
                }

                const action = {
                    type: 'SET_NEW_PAIRING_BOARD_MODAL_ERROR_MESSAGE',
                    errorResponse: {
                        message: 'some message',
                        fieldErrors: null
                    }
                }

                const stateAfter = {
                    newPairingBoardModalErrorMessage: 'some message'
                }

                deepFreeze(stateBefore)
                deepFreeze(action)

                expect(modalReducer(stateBefore, action)).toEqual(stateAfter)
            })
        })

        describe('SET_NEW_ROLE_MODAL_ERROR_MESSAGE', () => {
            it('sets newRoleModalErrorMessage to the name field error', () => {
                const stateBefore = {
                    newRoleModalErrorMessage: undefined
                }

                const action = {
                    type: 'SET_NEW_ROLE_MODAL_ERROR_MESSAGE',
                    errorResponse: {
                        message: 'some message',
                        fieldErrors: { name: 'some name message' }
                    }
                }

                const stateAfter = {
                    newRoleModalErrorMessage: 'some name message'
                }

                deepFreeze(stateBefore)
                deepFreeze(action)

                expect(modalReducer(stateBefore, action)).toEqual(stateAfter)
            })

            it('sets newRoleModalErrorMessage to the message when there are no field errors', () => {
                const stateBefore = {
                    newRoleModalErrorMessage: undefined
                }

                const action = {
                    type: 'SET_NEW_ROLE_MODAL_ERROR_MESSAGE',
                    errorResponse: {
                        message: 'some message',
                        fieldErrors: null
                    }
                }

                const stateAfter = {
                    newRoleModalErrorMessage: 'some message'
                }

                deepFreeze(stateBefore)
                deepFreeze(action)

                expect(modalReducer(stateBefore, action)).toEqual(stateAfter)
            })
        })
	})
})
