var DeepFreeze = require('deep-freeze');
var App = require('../src/app.js');

describe("app", function() {

	describe("appReducer", function() {

		beforeEach(function () {
			this.workspaceReducerSpy = spyOn(App, 'workspaceReducer').and.returnValue({
				name: 'cowa'
			});
		});

		it("sets up the default state", function() {
			var stateBefore = undefined;
			var stateAfter = {
				can_move: true,
				workspace: {
					name: 'cowa'
				}
			};

			expect(
				App.appReducer(stateBefore, {})
			).toEqual(stateAfter);

			expect(this.workspaceReducerSpy).toHaveBeenCalledWith(stateBefore, {});
		});

		describe("actions", function() {
			describe("SET_MOVE", function() {
				it("should set can_move to the passed in value", function() {
					var stateBefore = {
						can_move: false,
						workspace: {
							name: 'cowa'
						}
					};

					var action = {
						type: "SET_MOVE",
						can_move: true
					};

					var stateAfter = {
						can_move: true,
						workspace: {
							name: 'cowa'
						}
					};

					DeepFreeze(stateBefore);
					DeepFreeze(action);

					expect(
						App.appReducer(stateBefore, action)
					).toEqual(stateAfter);

					expect(this.workspaceReducerSpy).toHaveBeenCalledWith(stateBefore, action);
				});
			});
		});

	});


});
