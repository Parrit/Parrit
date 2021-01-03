"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var initialState = {
    message: undefined,
};
function default_1(state, action) {
    if (state === void 0) { state = initialState; }
    switch (action.type) {
        case "SET_SYSTEM_ALERT_MESSAGE":
            return { message: action.message };
        case "CLEAR_SYSTEM_ALERT_MESSAGE":
            return { message: undefined };
        default:
            return state;
    }
}
exports.default = default_1;
