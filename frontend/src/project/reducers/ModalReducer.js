"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var initialState = {
    isNewPersonModalOpen: false,
    isNewPairingBoardModalOpen: false,
    isNewRoleModalOpen: false,
    newPersonModalErrorMessage: undefined,
    newPairingBoardModalErrorMessage: undefined,
    newRoleModalErrorMessage: undefined,
    newRolePairingBoardId: undefined,
};
function default_1(state, action) {
    if (state === void 0) { state = initialState; }
    switch (action.type) {
        case "SET_NEW_PERSON_MODAL_OPEN":
            return Object.assign({}, state, {
                isNewPersonModalOpen: action.isOpen,
                newPersonModalErrorMessage: undefined,
            });
        case "SET_NEW_PAIRING_BOARD_MODAL_OPEN":
            return Object.assign({}, state, {
                isNewPairingBoardModalOpen: action.isOpen,
                newPairingBoardModalErrorMessage: undefined,
            });
        case "SET_NEW_ROLE_MODAL_OPEN":
            return Object.assign({}, state, {
                isNewRoleModalOpen: action.isOpen,
                newRolePairingBoardId: action.pairingBoardId,
                newRoleModalErrorMessage: undefined,
            });
        case "SET_NEW_PERSON_MODAL_ERROR_MESSAGE": {
            var errorMessage = action.errorResponse.fieldErrors
                ? action.errorResponse.fieldErrors.name
                : action.errorResponse.message;
            return Object.assign({}, state, {
                newPersonModalErrorMessage: errorMessage,
            });
        }
        case "SET_NEW_PAIRING_BOARD_MODAL_ERROR_MESSAGE": {
            var errorMessage = action.errorResponse.fieldErrors
                ? action.errorResponse.fieldErrors.name
                : action.errorResponse.message;
            return Object.assign({}, state, {
                newPairingBoardModalErrorMessage: errorMessage,
            });
        }
        case "SET_NEW_ROLE_MODAL_ERROR_MESSAGE": {
            var errorMessage = action.errorResponse.fieldErrors
                ? action.errorResponse.fieldErrors.name
                : action.errorResponse.message;
            return Object.assign({}, state, {
                newRoleModalErrorMessage: errorMessage,
            });
        }
        default:
            return state;
    }
}
exports.default = default_1;
