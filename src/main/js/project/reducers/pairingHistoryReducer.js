var _ = require('lodash');

var pairingHistoryReducer = function(state, action) {
    if(typeof state === 'undefined') {
        return {
            pairingHistoryList: []
        };
    }

    switch (action.type) {
        case "LOAD_PAIRING_HISTORY":
            return {
                pairingHistoryList: action.pairingHistoryList
            };
        default:
            return state;
    }
};

module.exports = pairingHistoryReducer;
