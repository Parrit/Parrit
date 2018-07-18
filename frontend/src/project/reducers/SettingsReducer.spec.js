import settingsReducer from './SettingsReducer.js'

describe('SettingsReducer', () => {
    it('sets up the default state', () => {
        const stateBefore = undefined
        const action = {}
        const stateAfter = {
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
            },
            systemAlert: {
                message: undefined
            }
        }

        expect(settingsReducer(stateBefore, action)).toEqual(stateAfter)
    })
})
