var workspaceReducer = function(state, action) {
	return {
		spaces: [
		    {
		    	name: 'Unallocated',
		    	people: [{
		    		name: 'Joe'
		    	}, {
		    		name: 'Tony'
		    	}, {
		    		name: 'Nick'
		    	}]
		    }
		]
	};
};

module.exports = workspaceReducer;
