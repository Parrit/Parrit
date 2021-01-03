"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var initialState = {};
function default_1(state, action) {
    var _a, _b, _c;
    if (state === void 0) { state = initialState; }
    switch (action.type) {
        case "SET_PAIRING_BOARD_EDIT_MODE": {
            var updatedSettings = Object.assign({}, state[action.pairingBoardId], {
                editMode: action.editMode,
            });
            return Object.assign({}, state, (_a = {},
                _a[action.pairingBoardId] = updatedSettings,
                _a));
        }
        case "SET_PAIRING_BOARD_EDIT_ERROR_MESSAGE": {
            var errorMessage = action.errorResponse.fieldErrors
                ? action.errorResponse.fieldErrors.name
                : action.errorResponse.message;
            var updatedSettings = Object.assign({}, state[action.pairingBoardId], {
                editErrorMessage: errorMessage,
            });
            return Object.assign({}, state, (_b = {},
                _b[action.pairingBoardId] = updatedSettings,
                _b));
        }
        case "CLEAR_PAIRING_BOARD_EDIT_ERROR_MESSAGE": {
            var updatedSettings = __assign({}, state[action.pairingBoardId]);
            console.log("SUS", updatedSettings);
            return Object.assign({}, state, (_c = {},
                _c[action.pairingBoardId] = updatedSettings,
                _c));
        }
        default:
            return state;
    }
}
exports.default = default_1;
