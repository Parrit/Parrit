var workspaceReducer = function(state, action) {
	if(typeof state === 'undefined') {
		return {
			spaces: [
			    {
			    	name: 'Unallocated',
			    	people: []
			    }
			]
		};
	}

    switch (action.type) {
        case "LOAD_STATE":
            return action.state.workspace;
        default:
            return state;
    }
};

module.exports = workspaceReducer;
