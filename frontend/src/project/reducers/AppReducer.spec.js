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
                    newPersonModalErrorMessage: undefined,
                    newPairingBoardModalErrorMessage: undefined
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

