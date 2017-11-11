import dataReducer from 'project/reducers/dataReducer.js';

describe("dataReducer", function() {
    it("should get the default state", function() {
        var stateBefore = undefined;
        var action = {};
        var stateAfter = {
            project: {
                id: 0,
                people: [],
                pairingBoards: []
            },
            pairingHistory: {
                pairingHistoryList: []
            }
        };

        expect(
            dataReducer(stateBefore, action)
        ).toEqual(stateAfter);
    });
});

