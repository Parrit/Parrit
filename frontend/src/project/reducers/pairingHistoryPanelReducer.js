export default function (state, action) {
    if (typeof state === 'undefined') {
        state = {
            isOpen: false,
        };
    }

    switch (action.type) {
        case "SET_PAIRING_HISTORY_PANEL_OPEN":
            return {isOpen: action.isOpen};
        default:
            return state;
    }
};
