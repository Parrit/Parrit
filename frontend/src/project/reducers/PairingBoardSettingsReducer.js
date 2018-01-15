const initialState = {};

export default function (state = initialState, action) {
    switch (action.type) {
        case 'SET_PAIRING_BOARD_EDIT_MODE': {
            const updatedSettings = Object.assign({}, state[action.pairingBoardId], {editMode: action.editMode});
            return Object.assign({}, state, {[action.pairingBoardId]: updatedSettings});
        }
        case 'SET_EDIT_PAIRING_BOARD_ERROR_MESSAGE': {
            const errorMessage = action.errorResponse.fieldErrors ? action.errorResponse.fieldErrors.name : action.errorResponse.message;
            const updatedSettings = Object.assign({}, state[action.pairingBoardId], {editErrorMessage: errorMessage});
            return Object.assign({}, state, {[action.pairingBoardId]: updatedSettings});
        }
        case 'CLEAR_EDIT_PAIRING_BOARD_ERROR_MESSAGE': {
            const updatedSettings = Object.assign({}, state[action.pairingBoardId]);
            delete updatedSettings.editErrorMessage;
            return Object.assign({}, state, {[action.pairingBoardId]: updatedSettings});
        }
        default:
            return state;
    }
}