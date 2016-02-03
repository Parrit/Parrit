var appReducer = require('../../../main/js/reducers/appReducer.js');

describe("appReducer", function() {
	it("should get the default state", function() {
		var stateBefore = undefined;
		var action = {};
		var stateAfter = {
			settings: {
				canMove: true
			},
			workspace: {
				spaces: [
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

	it("should fail", function() {
		expect(false).toBe(true);
	});
});
