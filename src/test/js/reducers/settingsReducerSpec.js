var deepFreeze = require('deep-freeze');
var settingsReducer = require('reducers/settingsReducer.js');

describe("settingsReducer", function() {

	it("sets up the default state", function() {
		var stateBefore = undefined;
		var stateAfter = {
			canMove: true,
            setNewPersonModalOpen: false
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

        describe("SET_NEW_PERSON_MODAL_OPEN", function() {
            it("should set setNewPersonModalOpen to the passed in value", function() {
                var stateBefore = {
                    setNewPersonModalOpen: false
                };

                var action = {
                    type: "SET_NEW_PERSON_MODAL_OPEN",
                    isOpen: true
                };

                var stateAfter = {
                    setNewPersonModalOpen: true
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
