var workspaceReducer = require('../../../main/js/reducers/workspaceReducer.js');

describe("workspaceReducer", function() {
	it("should get the default state", function() {
		var stateBefore = undefined;
		var action = {};
		var stateAfter = {
			spaces: [
			    {
			    	name: 'Unallocated',
			    	people: []
			    }
			]
		};

		expect(
			workspaceReducer(stateBefore, action)
		).toEqual(stateAfter);
	});
});
