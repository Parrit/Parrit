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

	return state;
};

module.exports = workspaceReducer;
