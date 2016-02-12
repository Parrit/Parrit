var dataReducer = require('reducers/dataReducer.js');

describe("dataReducer", function() {
    it("should get the default state", function() {
        var stateBefore = undefined;
        var action = {};
        var stateAfter = {
            workspace: {
                id: 0,
                people: [],
                spaces: []
            }
        };

        expect(
            dataReducer(stateBefore, action)
        ).toEqual(stateAfter);
    });
});

