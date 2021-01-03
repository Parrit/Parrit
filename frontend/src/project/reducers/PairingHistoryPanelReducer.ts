const initialState = {
  isOpen: false,
};

export default function (state = initialState, action: any) {
  switch (action.type) {
    case "SET_PAIRING_HISTORY_PANEL_OPEN":
      return { isOpen: action.isOpen };
    default:
      return state;
  }
}
