const initialState: { [key: string]: object } = {};

export default function (state = initialState, action: any) {
  switch (action.type) {
    case "SET_PAIRING_BOARD_EDIT_MODE": {
      const updatedSettings = Object.assign({}, state[action.pairingBoardId], {
        editMode: action.editMode,
      });
      return Object.assign({}, state, {
        [action.pairingBoardId]: updatedSettings,
      });
    }
    case "SET_PAIRING_BOARD_EDIT_ERROR_MESSAGE": {
      const errorMessage = action.errorResponse.fieldErrors
        ? action.errorResponse.fieldErrors.name
        : action.errorResponse.message;
      const updatedSettings = Object.assign({}, state[action.pairingBoardId], {
        editErrorMessage: errorMessage,
      });
      return Object.assign({}, state, {
        [action.pairingBoardId]: updatedSettings,
      });
    }
    case "CLEAR_PAIRING_BOARD_EDIT_ERROR_MESSAGE": {
      const updatedSettings = { ...state[action.pairingBoardId] };
      console.log("SUS", updatedSettings);
      return Object.assign({}, state, {
        [action.pairingBoardId]: updatedSettings,
      });
    }
    default:
      return state;
  }
}
