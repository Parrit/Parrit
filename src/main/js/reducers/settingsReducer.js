var settingsReducer = function(state, action) {
	if (typeof state === 'undefined') {
		state = {
			canMove: true
		};
	}

	switch (action.type) {
        case "LOAD_STATE":
            return action.state.settings;
        case "SET_MOVE":
			return {
				canMove: action.canMove
			};
		default:
			return state;
	}
};

module.exports = settingsReducer;
