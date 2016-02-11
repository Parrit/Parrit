var settingsReducer = function(state, action) {
	if (typeof state === 'undefined') {
		state = {
			canMove: true,
            setNewPersonModalOpen: false
		};
	}

	switch (action.type) {
        case "SET_MOVE":
			return Object.assign({}, state, {canMove: action.canMove});
        case "SET_NEW_PERSON_MODAL_OPEN":
            return Object.assign({}, state, {setNewPersonModalOpen: action.isOpen});
		default:
			return state;
	}
};

module.exports = settingsReducer;
