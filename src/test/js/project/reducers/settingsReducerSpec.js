var deepFreeze = require('deep-freeze');
var settingsReducer = require('project/reducers/settingsReducer.js');

describe("settingsReducer", function() {

	it("sets up the default state", function() {
		var stateBefore = undefined;
		var stateAfter = {
            isNewPersonModalOpen: false,
            isNewPairingBoardModalOpen: false,
            isPairingHistoryPanelOpen: false,
            errorType: 0
		};

		expect(
			settingsReducer(stateBefore, {})
		).toEqual(stateAfter);
	});

	describe("actions", function() {
        describe("SET_NEW_PERSON_MODAL_OPEN", function() {
            it("should set isNewPersonModalOpen to the passed in value", function() {
                var stateBefore = {
                    isNewPersonModalOpen: false
                };

                var action = {
                    type: "SET_NEW_PERSON_MODAL_OPEN",
                    isOpen: true
                };

                var stateAfter = {
                    isNewPersonModalOpen: true
                };

                deepFreeze(stateBefore);
                deepFreeze(action);

                expect(
                    settingsReducer(stateBefore, action)
                ).toEqual(stateAfter);
            });
        });

        describe("SET_NEW_PAIRING_BOARD_MODAL_OPEN", function() {
            it("should set isNewPairingBoardModalOpen to the passed in value", function() {
                var stateBefore = {
                    isNewPairingBoardModalOpen: false
                };

                var action = {
                    type: "SET_NEW_PAIRING_BOARD_MODAL_OPEN",
                    isOpen: true
                };

                var stateAfter = {
                    isNewPairingBoardModalOpen: true
                };

                deepFreeze(stateBefore);
                deepFreeze(action);

                expect(
                    settingsReducer(stateBefore, action)
                ).toEqual(stateAfter);
            });
        });

        describe("SET_PAIRING_HISTORY_PANEL_OPEN", function() {
            it("should set isPairingHistoryPanelOpen to the passed in value", function() {
                var stateBefore = {
                    isPairingHistoryPanelOpen: false
                };

                var action = {
                    type: "SET_PAIRING_HISTORY_PANEL_OPEN",
                    isOpen: true
                };

                var stateAfter = {
                    isPairingHistoryPanelOpen: true
                };

                deepFreeze(stateBefore);
                deepFreeze(action);

                expect(
                    settingsReducer(stateBefore, action)
                ).toEqual(stateAfter);
            });
        });

        describe("SET_ERROR_TYPE", function() {
            it("should set errorType to the passed in value", function() {
                var stateBefore = {
                    errorType: 0
                };

                var action = {
                    type: "SET_ERROR_TYPE",
                    errorType: 401
                };

                var stateAfter = {
                    errorType: 401
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
