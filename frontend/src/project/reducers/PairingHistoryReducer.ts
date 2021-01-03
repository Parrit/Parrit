const initialState = {
  pairingHistoryList: [],
};

export default function (state = initialState, action: any) {
  switch (action.type) {
    case "LOAD_PAIRING_HISTORY": {
      return { pairingHistoryList: action.pairingHistoryList };
    }
    case "UPDATE_PAIRING_HISTORIES": {
      const newPairingHistoryList = action.newPairingHistories.concat(
        state.pairingHistoryList
      );
      return { pairingHistoryList: newPairingHistoryList };
    }
    default:
      return state;
  }
}
