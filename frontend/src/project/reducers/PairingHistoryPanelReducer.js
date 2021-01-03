"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var initialState = {
    isOpen: false,
};
function default_1(state, action) {
    if (state === void 0) { state = initialState; }
    switch (action.type) {
        case "SET_PAIRING_HISTORY_PANEL_OPEN":
            return { isOpen: action.isOpen };
        default:
            return state;
    }
}
exports.default = default_1;
