import appReducer from './AppReducer.js'

describe('AppReducer', () => {
	it('should get the default state', () => {
		const stateBefore = undefined
		const action = {}
		const stateAfter = {
            settings: {
                modal: {
                   isNewPersonModalOpen: false,
                   isNewPairingBoardModalOpen: false,
                   isNewRoleModalOpen: false,
                   newPersonModalErrorMessage: undefined,
                   newPairingBoardModalErrorMessage: undefined,
                   newRoleModalErrorMessage: undefined,
                   newRolePairingBoardId: undefined
                },
                pairingBoardSettings: {},
                pairingHistoryPanel: {
                    isOpen: false
                }
			},
            data: {
                project: {
                    id: 0,
                    people: [],
                    pairingBoards: []
                },
                pairingHistory: {
                    pairingHistoryList: []
                }
            }
		}

		expect(appReducer(stateBefore, action)).toEqual(stateAfter)
	})
})

