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
            console.log("UPDATING with new=" , typeof action.newPairingHistories , " " , action.newPairingHistories);
            var stateClone = _.cloneDeep(state);

            stateClone.pairingHistoryList = action.newPairingHistories.concat(stateClone.pairingHistoryList);

            console.log("NEW HISTORIES= " , typeof stateClone.pairingHistoryList , " " , stateClone.pairingHistoryList);

            console.log(JSON.stringify(stateClone));

            return stateClone;
        default:
            return state;
    }
};

module.exports = pairingHistoryReducer;
