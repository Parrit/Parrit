var workspaceReducer = function(state, action) {
	return {
		stations: [
		    {
		    	name: 'Unallocated',
		    	people: []
		    }
		]
	};
};

module.exports = workspaceReducer;
