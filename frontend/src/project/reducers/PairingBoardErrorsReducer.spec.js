import deepFreeze from 'deep-freeze';
import pairingBoardErrorsReducer from './PairingBoardErrorsReducer.js';

describe("PairingBoardErrorsReducer", () => {
	it("begins with no error messages", () => {
		const stateBefore = undefined;
		const action = {};
		const stateAfter = {};

		expect(pairingBoardErrorsReducer(stateBefore, action)).toEqual(stateAfter);
	});

	describe('SET_EDIT_PAIRING_BOARD_ERROR_MESSAGE', () => {
	    it('sets the pairing board error message using the name field error', () => {
            const stateBefore = {};

            const action = {
                type: "SET_EDIT_PAIRING_BOARD_ERROR_MESSAGE",
                pairingBoardId: 7,
                errorResponse: {
                    message: 'some message',
                    fieldErrors: { name: 'some name message' }
                }
            };

            const stateAfter = {
                7: 'some name message'
            };

            deepFreeze(stateBefore);
            deepFreeze(action);

            expect(pairingBoardErrorsReducer(stateBefore, action)).toEqual(stateAfter);
	    })

	    it('sets the error message using the message when there are no field errors', () => {
            const stateBefore = {};

            const action = {
                type: "SET_EDIT_PAIRING_BOARD_ERROR_MESSAGE",
                pairingBoardId: 7,
                errorResponse: {
                    message: 'some message',
                    fieldErrors: null
                }
            };

            const stateAfter = {
                7: 'some message'
            };

            deepFreeze(stateBefore);
            deepFreeze(action);

            expect(pairingBoardErrorsReducer(stateBefore, action)).toEqual(stateAfter);
        })

	    it('updates the error message if the pairing board already has a error message', () => {
            const stateBefore = {
                7: 'some name message',
                8: 'some other name message'
            };

            const action = {
                type: "SET_EDIT_PAIRING_BOARD_ERROR_MESSAGE",
                pairingBoardId: 7,
                errorResponse: {
                    message: 'some message',
                    fieldErrors: { name: 'some new name message' }
                }
            };

            const stateAfter = {
                7: 'some new name message',
                8: 'some other name message'
            };

            deepFreeze(stateBefore);
            deepFreeze(action);

            expect(pairingBoardErrorsReducer(stateBefore, action)).toEqual(stateAfter);
	    })
	})

	describe('CLEAR_EDIT_PAIRING_BOARD_ERROR_MESSAGE', () => {
	    it('removes the pairing board error message', () => {
            const stateBefore = {
                7: 'some name message',
                8: 'some other name message'
            };

            const action = {
                type: "CLEAR_EDIT_PAIRING_BOARD_ERROR_MESSAGE",
                pairingBoardId: 7,
            };

            const stateAfter = {
                8: 'some other name message'
            };

            deepFreeze(stateBefore);
            deepFreeze(action);

            expect(pairingBoardErrorsReducer(stateBefore, action)).toEqual(stateAfter);
	    })
	})
});

