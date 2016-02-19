var appReducer = require('workspace/reducers/appReducer.js');

describe("appReducer", function() {
	it("should get the default state", function() {
		var stateBefore = undefined;
		var action = {};
		var stateAfter = {
            settings: {
                isNewPersonModalOpen: false,
                isNewSpaceModalOpen: false
			},
            data: {
                workspace: {
                    id: 0,
                    people: [],
                    spaces: []
                }
            }
		};

		expect(
			appReducer(stateBefore, action)
		).toEqual(stateAfter);
	});
});

