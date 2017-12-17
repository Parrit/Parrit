const initialState = {};

export default function (state = initialState, action) {
    switch (action.type) {
        case 'SET_EDIT_PAIRING_BOARD_ERROR_MESSAGE':
            const errorMessage = action.errorResponse.fieldErrors ? action.errorResponse.fieldErrors.name : action.errorResponse.message;
            return Object.assign({}, state, {[action.pairingBoardId]: errorMessage});
        case 'CLEAR_EDIT_PAIRING_BOARD_ERROR_MESSAGE':
            const newState = Object.assign({}, state);
            delete newState[action.pairingBoardId];
            return newState;
        default:
            return state;
    }
}