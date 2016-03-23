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
        case "UPDATE_PAIRING_HISTORIES":
            var stateClone = _.cloneDeep(state);

            stateClone.pairingHistoryList = action.newPairingHistories.concat(stateClone.pairingHistoryList);

            return stateClone;
        default:
            return state;
    }
};

module.exports = pairingHistoryReducer;
