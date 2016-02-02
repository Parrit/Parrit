var appReducer = require('../../src/reducers/appReducer.js');

describe("appReducer", function() {
	it("should get the default state", function() {
		var stateBefore = {};
		var action = {};
		var stateAfter = {
			settings: {
				canMove: true
			},
			workspace: {
				stations: [
				    {
				    	name: 'Unallocated',
				    	people: []
				    }
				]
			}
		};

		expect(
			appReducer(stateBefore, action)
		).toEqual(stateAfter);
	});
});
