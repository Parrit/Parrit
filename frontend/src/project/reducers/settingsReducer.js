export default function (state, action) {
    if (typeof state === 'undefined') {
        state = {
            isNewPersonModalOpen: false,
            isNewPairingBoardModalOpen: false,
            isPairingHistoryPanelOpen: false,
            newPersonModalErrorMessage: undefined,
            newPairingBoardModalErrorMessage: undefined
        };
    }

    switch (action.type) {
        case "SET_NEW_PERSON_MODAL_OPEN":
            return Object.assign({}, state, {isNewPersonModalOpen: action.isOpen, newPersonModalErrorMessage: undefined});
        case "SET_NEW_PAIRING_BOARD_MODAL_OPEN":
            return Object.assign({}, state, {isNewPairingBoardModalOpen: action.isOpen, newPairingBoardModalErrorMessage: undefined});
        case "SET_PAIRING_HISTORY_PANEL_OPEN":
            return Object.assign({}, state, {isPairingHistoryPanelOpen: action.isOpen});
        case "SET_NEW_PERSON_MODAL_ERROR_MESSAGE": {
            const errorMessage = action.errorResponse.fieldErrors ? action.errorResponse.fieldErrors.name : action.errorResponse.message;
            return Object.assign({}, state, {newPersonModalErrorMessage: errorMessage});
        }
        case "SET_NEW_PAIRING_BOARD_MODAL_ERROR_MESSAGE": {
            const errorMessage = action.errorResponse.fieldErrors ? action.errorResponse.fieldErrors.name : action.errorResponse.message;
            return Object.assign({}, state, {newPairingBoardModalErrorMessage: errorMessage});
        }
        default:
            return state;
    }
};
