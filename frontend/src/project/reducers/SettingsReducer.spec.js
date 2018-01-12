import deepFreeze from 'deep-freeze';
import settingsReducer from './SettingsReducer.js';

describe("SettingsReducer", () => {
	it("sets up the default state", () => {
		const stateBefore = undefined;
		const action = {};
		const stateAfter = {
			modal: {
				isNewPersonModalOpen: false,
				isNewRoleModalOpen: false,
				isNewPairingBoardModalOpen: false,
				newPersonModalErrorMessage: undefined,
				newRoleModalErrorMessage: undefined,
				newPairingBoardModalErrorMessage: undefined
			},
			pairingBoardErrors: {},
			pairingHistoryPanel: {
				isOpen: false
			}
		};

		expect(settingsReducer(stateBefore, action)).toEqual(stateAfter);
	});
});
