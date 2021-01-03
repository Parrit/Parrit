"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var initialState = {
    id: 0,
    name: undefined,
    people: [],
    pairingBoards: [],
};
function default_1(state, action) {
    if (state === void 0) { state = initialState; }
    switch (action.type) {
        case "LOAD_PROJECT":
            return action.project;
        default:
            return state;
    }
}
exports.default = default_1;
