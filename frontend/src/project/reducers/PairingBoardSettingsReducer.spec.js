import deepFreeze from 'deep-freeze';
import pairingBoardSettingsReducer from './PairingBoardSettingsReducer.js';

describe("PairingBoardSettingsReducer", () => {
	it("begins with no error messages", () => {
		const stateBefore = undefined;
		const action = {};
		const stateAfter = {};

		expect(pairingBoardSettingsReducer(stateBefore, action)).toEqual(stateAfter);
	});

    describe('SET_PAIRING_BOARD_EDIT_MODE', () => {
        it('sets the pairing board edit mode when no settings exist for the object', () => {
            const stateBefore = {};

            const action = {
                type: "SET_PAIRING_BOARD_EDIT_MODE",
                pairingBoardId: 7,
                editMode: false
            };

            const stateAfter = {
                7: {
                    editMode: false
                }
            };

            deepFreeze(stateBefore);
            deepFreeze(action);

            expect(pairingBoardSettingsReducer(stateBefore, action)).toEqual(stateAfter);
        })

        it('sets the pairing board edit mode when a settings exist for the object', () => {
            const stateBefore = {
                7: {
                    editMode: true,
                    editErrorMessage: 'some error message'
                }
            };

            const action = {
                type: "SET_PAIRING_BOARD_EDIT_MODE",
                pairingBoardId: 7,
                editMode: false
            };

            const stateAfter = {
                7: {
                    editMode: false,
                    editErrorMessage: 'some error message'
                }
            };

            deepFreeze(stateBefore);
            deepFreeze(action);

            expect(pairingBoardSettingsReducer(stateBefore, action)).toEqual(stateAfter);
        })
    })

	describe('SET_PAIRING_BOARD_EDIT_ERROR_MESSAGE', () => {
	    it('sets the pairing board error message using the name field error', () => {
            const stateBefore = {};

            const action = {
                type: "SET_PAIRING_BOARD_EDIT_ERROR_MESSAGE",
                pairingBoardId: 7,
                errorResponse: {
                    message: 'some message',
                    fieldErrors: { name: 'some name message' }
                }
            };

            const stateAfter = {
                7: {
                    editErrorMessage: 'some name message'
                }
            };

            deepFreeze(stateBefore);
            deepFreeze(action);

            expect(pairingBoardSettingsReducer(stateBefore, action)).toEqual(stateAfter);
	    })

	    it('sets the error message using the message when there are no field errors', () => {
            const stateBefore = {};

            const action = {
                type: "SET_PAIRING_BOARD_EDIT_ERROR_MESSAGE",
                pairingBoardId: 7,
                errorResponse: {
                    message: 'some message',
                    fieldErrors: null
                }
            };

            const stateAfter = {
                7: {
                    editErrorMessage: 'some message'
                }
            };

            deepFreeze(stateBefore);
            deepFreeze(action);

            expect(pairingBoardSettingsReducer(stateBefore, action)).toEqual(stateAfter);
        })

	    it('updates the error message if the pairing board already has a error message', () => {
            const stateBefore = {
                7: {
                    editMode: true,
                    editErrorMessage: 'some name message'
                },
                8: {
                    editMode: false,
                    editErrorMessage: 'some other name message'
                }
            };

            const action = {
                type: "SET_PAIRING_BOARD_EDIT_ERROR_MESSAGE",
                pairingBoardId: 7,
                errorResponse: {
                    message: 'some message',
                    fieldErrors: { name: 'some new name message' }
                }
            };

            const stateAfter = {
                7: {
                    editMode: true,
                    editErrorMessage: 'some new name message'
                },
                8: {
                    editMode: false,
                    editErrorMessage: 'some other name message'
                }
            };

            deepFreeze(stateBefore);
            deepFreeze(action);

            expect(pairingBoardSettingsReducer(stateBefore, action)).toEqual(stateAfter);
	    })
	})

	describe('CLEAR_PAIRING_BOARD_EDIT_ERROR_MESSAGE', () => {
	    it('removes the pairing board error message', () => {
            const stateBefore = {
                7: {
                    editMode: true,
                    editErrorMessage: 'some name message'
                },
                8: {
                    editMode: false,
                    editErrorMessage: 'some other name message'
                }
            };

            const action = {
                type: "CLEAR_PAIRING_BOARD_EDIT_ERROR_MESSAGE",
                pairingBoardId: 7,
            };

            const stateAfter = {
                7: {
                    editMode: true
                },
                8: {
                    editMode: false,
                    editErrorMessage: 'some other name message'
                }
            };

            deepFreeze(stateBefore);
            deepFreeze(action);

            expect(pairingBoardSettingsReducer(stateBefore, action)).toEqual(stateAfter);
	    })
	})
});

