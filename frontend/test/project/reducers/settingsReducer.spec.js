import deepFreeze from 'deep-freeze';
import settingsReducer from 'project/reducers/settingsReducer.js';

describe("settingsReducer", () => {
	it("sets up the default state", () => {
		const stateBefore = undefined;
		const stateAfter = {
            isNewPersonModalOpen: false,
            isNewPairingBoardModalOpen: false,
            isPairingHistoryPanelOpen: false,
            newPersonModalErrorMessage: undefined
		};

		expect(
			settingsReducer(stateBefore, {})
		).toEqual(stateAfter);
	});

	describe("actions", () => {
        describe("SET_NEW_PERSON_MODAL_OPEN", () => {
            it("sets isNewPersonModalOpen to the passed in value", () => {
                const stateBefore = {
                    isNewPersonModalOpen: false
                };

                const action = {
                    type: "SET_NEW_PERSON_MODAL_OPEN",
                    isOpen: true
                };

                const stateAfter = {
                    isNewPersonModalOpen: true
                };

                deepFreeze(stateBefore);
                deepFreeze(action);

                expect(
                    settingsReducer(stateBefore, action)
                ).toEqual(stateAfter);
            });

            it("clears the newPersonModalErrorMessage", () => {
                const stateBefore = {
                    isNewPersonModalOpen: true,
                    newPersonModalErrorMessage: "some error message"
                };

                const action = {
                    type: "SET_NEW_PERSON_MODAL_OPEN",
                    isOpen: false
                };

                const stateAfter = {
                    isNewPersonModalOpen: false,
                    newPersonModalErrorMessage: undefined
                };

                deepFreeze(stateBefore);
                deepFreeze(action);

                expect(
                    settingsReducer(stateBefore, action)
                ).toEqual(stateAfter);
            });
        });

        describe("SET_NEW_PAIRING_BOARD_MODAL_OPEN", () => {
            it("sets isNewPairingBoardModalOpen to the passed in value", () => {
                const stateBefore = {
                    isNewPairingBoardModalOpen: false
                };

                const action = {
                    type: "SET_NEW_PAIRING_BOARD_MODAL_OPEN",
                    isOpen: true
                };

                const stateAfter = {
                    isNewPairingBoardModalOpen: true
                };

                deepFreeze(stateBefore);
                deepFreeze(action);

                expect(
                    settingsReducer(stateBefore, action)
                ).toEqual(stateAfter);
            });
        });

        describe("SET_PAIRING_HISTORY_PANEL_OPEN", () => {
            it("sets isPairingHistoryPanelOpen to the passed in value", () => {
                const stateBefore = {
                    isPairingHistoryPanelOpen: false
                };

                const action = {
                    type: "SET_PAIRING_HISTORY_PANEL_OPEN",
                    isOpen: true
                };

                const stateAfter = {
                    isPairingHistoryPanelOpen: true
                };

                deepFreeze(stateBefore);
                deepFreeze(action);

                expect(
                    settingsReducer(stateBefore, action)
                ).toEqual(stateAfter);
            });
        });

        describe("SET_NEW_PERSON_MODAL_ERROR_MESSAGE", () => {
            it("sets newPersonModalErrorMessage to the name field error", () => {
                const stateBefore = {
                    newPersonModalErrorMessage: undefined
                };

                const action = {
                    type: "SET_NEW_PERSON_MODAL_ERROR_MESSAGE",
                    errorResponse: {
                        message: 'some message',
                        fieldErrors: { name: 'some name message' }
                    }
                };

                const stateAfter = {
                    newPersonModalErrorMessage: 'some name message'
                };

                deepFreeze(stateBefore);
                deepFreeze(action);

                expect(
                    settingsReducer(stateBefore, action)
                ).toEqual(stateAfter);
            });

            it("sets newPersonModalErrorMessage to the message when there are no field errors", () => {
                const stateBefore = {
                    newPersonModalErrorMessage: undefined
                };

                const action = {
                    type: "SET_NEW_PERSON_MODAL_ERROR_MESSAGE",
                    errorResponse: {
                        message: 'some message',
                        fieldErrors: null
                    }
                };

                const stateAfter = {
                    newPersonModalErrorMessage: 'some message'
                };

                deepFreeze(stateBefore);
                deepFreeze(action);

                expect(
                    settingsReducer(stateBefore, action)
                ).toEqual(stateAfter);
            });
        });
	});
});
