var settingsReducer = function(state, action) {
    if (typeof state === 'undefined') {
        state = 0;
    }

    switch (action.type) {
        case "LOAD_STATE":
            return action.state.id;
        default:
            return state;
    }
};

module.exports = settingsReducer;
