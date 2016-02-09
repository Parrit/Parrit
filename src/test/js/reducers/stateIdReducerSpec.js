var deepFreeze = require('deep-freeze');
var stateIdReducer = require('reducers/stateIdReducer.js');

describe("stateIdReducer", function() {

    it("sets up the default state", function() {
        var stateBefore = undefined;
        var stateAfter = 0;

        expect(
            stateIdReducer(stateBefore, {})
        ).toEqual(stateAfter);
    });

    describe("actions", function() {
        describe("LOAD_STATE", function() {
            it("should set the state to the passed in 'settings'", function() {
                var stateBefore = 0;

                var action = {
                    type: "LOAD_STATE",
                    state: {
                        id: 1,
                        blah: {
                            shoobadooba: "doobadoowa"
                        },
                        settings: {
                            canMove: true
                        }
                    }
                };

                var stateAfter = 1;

                deepFreeze(stateBefore);
                deepFreeze(action);

                expect(
                    stateIdReducer(stateBefore, action)
                ).toEqual(stateAfter);
            });
        });
    });
});