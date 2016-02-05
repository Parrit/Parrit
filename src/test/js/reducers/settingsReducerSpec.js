var deepFreeze = require('deep-freeze');
var settingsReducer = require('reducers/settingsReducer.js');

describe("settingsReducer", function() {

	it("sets up the default state", function() {
		var stateBefore = undefined;
		var stateAfter = {
			canMove: true
		};

		expect(
			settingsReducer(stateBefore, {})
		).toEqual(stateAfter);
	});

	describe("actions", function() {
		describe("SET_MOVE", function() {
			it("should set canMove to the passed in value", function() {
				var stateBefore = {
					canMove: false
				};

				var action = {
					type: "SET_MOVE",
					canMove: true
				};

				var stateAfter = {
					canMove: true
				};

				deepFreeze(stateBefore);
				deepFreeze(action);

				expect(
					settingsReducer(stateBefore, action)
				).toEqual(stateAfter);
			});
		});

        describe("LOAD_STATE", function() {
            it("should set the state to the passed in 'settings'", function() {
                var stateBefore = {
                    canMove: false
                };

                var action = {
                    type: "LOAD_STATE",
                    state: {
                        blah: {
                            shoobadooba: "doobadoowa"
                        },
                        settings: {
                            canMove: true
                        }
                    }
                };

                var stateAfter = {
                    canMove: true
                };

                deepFreeze(stateBefore);
                deepFreeze(action);

                expect(
                    settingsReducer(stateBefore, action)
                ).toEqual(stateAfter);
            });
        });
	});
});
