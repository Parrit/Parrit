export default function (state, action) {
    if (typeof state === 'undefined') {
        state = {
            isNewPersonModalOpen: false,
            isNewPairingBoardModalOpen: false,
            isPairingHistoryPanelOpen: false,
            errorType: 0
        };
    }

    switch (action.type) {
        case "SET_NEW_PERSON_MODAL_OPEN":
            return Object.assign({}, state, {isNewPersonModalOpen: action.isOpen});
        case "SET_NEW_PAIRING_BOARD_MODAL_OPEN":
            return Object.assign({}, state, {isNewPairingBoardModalOpen: action.isOpen});
        case "SET_PAIRING_HISTORY_PANEL_OPEN":
            return Object.assign({}, state, {isPairingHistoryPanelOpen: action.isOpen});
        case "SET_ERROR_TYPE":
            return Object.assign({}, state, {errorType: action.errorType});
        default:
            return state;
    }
};
