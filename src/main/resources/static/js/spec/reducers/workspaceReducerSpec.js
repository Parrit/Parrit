var workspaceReducer = require('../../src/reducers/workspaceReducer.js');

describe("workspaceReducer", function() {
	it("should get the default state", function() {
		var stateBefore = {};
		var action = {};
		var stateAfter = {
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

		expect(
			workspaceReducer(stateBefore, action)
		).toEqual(stateAfter);
	});
});
