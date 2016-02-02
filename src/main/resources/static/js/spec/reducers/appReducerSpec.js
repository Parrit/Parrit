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
			}
		};

		expect(
			appReducer(stateBefore, action)
		).toEqual(stateAfter);
	});
});
