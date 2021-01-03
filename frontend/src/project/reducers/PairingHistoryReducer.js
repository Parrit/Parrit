"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var initialState = {
    pairingHistoryList: [],
};
function default_1(state, action) {
    if (state === void 0) { state = initialState; }
    switch (action.type) {
        case "LOAD_PAIRING_HISTORY": {
            return { pairingHistoryList: action.pairingHistoryList };
        }
        case "UPDATE_PAIRING_HISTORIES": {
            var newPairingHistoryList = action.newPairingHistories.concat(state.pairingHistoryList);
            return { pairingHistoryList: newPairingHistoryList };
        }
        default:
            return state;
    }
}
exports.default = default_1;
