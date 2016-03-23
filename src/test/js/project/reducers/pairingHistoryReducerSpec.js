var deepFreeze = require('deep-freeze');
var pairingHistoryReducer = require('project/reducers/pairingHistoryReducer.js');

describe("pairingHistoryReducer", function () {
    it("should get the default state", function () {
        var stateBefore = undefined;
        var action = {};
        var stateAfter = {
            pairingHistoryList: []
        };

        expect(
            pairingHistoryReducer(stateBefore, action)
        ).toEqual(stateAfter);
    });

    describe("actions", function () {
        describe("LOAD_PAIRING_HISTORY", function () {
            it("should set the pairingHistoryList to the passed in pairingHistoryList", function () {
                var stateBefore = {
                    pairingHistoryList: []
                };

                var action = {
                    type: "LOAD_PAIRING_HISTORY",
                    pairingHistoryList: [{shoobadooba: "doobadoowa"}]
                };

                var stateAfter = {
                    pairingHistoryList: [{shoobadooba: "doobadoowa"}]
                };

                deepFreeze(stateBefore);
                deepFreeze(action);

                expect(
                    pairingHistoryReducer(stateBefore, action)
                ).toEqual(stateAfter);
            });
        });

        describe("UPDATE_PAIRING_HISTORIES", function () {
            it("should add the new pairing histories to front of the pairingHistoryList", function () {
                var stateBefore = {
                    pairingHistoryList: [{shoobadooba: "doobadoowa"}]
                };

                var action = {
                    type: "UPDATE_PAIRING_HISTORIES",
                    newPairingHistories: [{newbadooba: "babadooba"}, {baduuuuba: "beboopa"}]
                };

                var stateAfter = {
                    pairingHistoryList: [{newbadooba: "babadooba"}, {baduuuuba: "beboopa"}, {shoobadooba: "doobadoowa"}]
                };

                deepFreeze(stateBefore);
                deepFreeze(action);

                expect(
                    pairingHistoryReducer(stateBefore, action)
                ).toEqual(stateAfter);
            });
        });
    });
});
