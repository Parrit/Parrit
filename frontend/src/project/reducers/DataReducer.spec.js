import dataReducer from './DataReducer.js';

describe("DataReducer", () => {
    it("should get the default state", () => {
        const stateBefore = undefined;
        const action = {};
        const stateAfter = {
            project: {
                id: 0,
                people: [],
                roles: [],
                pairingBoards: []
            },
            pairingHistory: {
                pairingHistoryList: []
            }
        };

        expect(dataReducer(stateBefore, action)).toEqual(stateAfter);
    });
});

