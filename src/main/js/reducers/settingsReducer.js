var settingsReducer = function(state, action) {
	if (typeof state === 'undefined') {
		state = {
            isNewPersonModalOpen: false,
            isNewSpaceModalOpen: false
		};
	}

	switch (action.type) {
        case "SET_NEW_PERSON_MODAL_OPEN":
            return Object.assign({}, state, {isNewPersonModalOpen: action.isOpen});
        case "SET_NEW_SPACE_MODAL_OPEN":
            return Object.assign({}, state, {isNewSpaceModalOpen: action.isOpen});
		default:
			return state;
	}
};

module.exports = settingsReducer;
